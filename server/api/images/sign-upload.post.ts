import { prisma } from '~/server/utils/prisma'
import {
  readBody,
  getCookie,
  createError,
  defineEventHandler
} from 'h3'

import { v2 as cloudinary } from 'cloudinary'

const config = useRuntimeConfig()

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
})

export default defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, 'auth_token')

    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No autorizado'
      })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Usuario no encontrado'
      })
    }

    const body = await readBody(event)
    const { fileName } = body

    if (!fileName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Nombre de archivo requerido'
      })
    }

    // Generate unique public_id for unsigned upload
    const uniqueId = `burbuarchivos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Cloudinary unsigned upload URL (no signature needed)
    const uploadUrl = `https://api.cloudinary.com/v1_1/${config.CLOUDINARY_CLOUD_NAME}/image/upload`

    return {
      ok: true,
      data: {
        apiKey: config.CLOUDINARY_API_KEY,
        cloudName: config.CLOUDINARY_CLOUD_NAME,
        timestamp: Math.round(new Date().getTime() / 1000),
        publicId: uniqueId,
        folder: 'burbuarchivos',
        uploadUrl,
uploadPreset: 'burbu_upload'
      }
    }

  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || 'Error al generar credenciales'
    })
  }
})

