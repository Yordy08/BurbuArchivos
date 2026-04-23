import { prisma } from '~/server/utils/prisma'
import { getCookie, createError, defineEventHandler } from 'h3'
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
      throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
    }

    const id = event.context.params?.id

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID no válido' })
    }

    const image = await prisma.image.findUnique({
      where: { id }
    })

    if (!image) {
      throw createError({ statusCode: 404, statusMessage: 'La imagen no existe' })
    }

    if (image.userId !== userId) {
      throw createError({ statusCode: 403, statusMessage: 'No tienes permiso para eliminar esta imagen' })
    }

    let publicId = image.publicId

    if (!publicId && image.urlOriginal) {
      const match = image.urlOriginal.match(/\/upload\/v\d+\/(.+)\./)
      if (match && match[1]) {
        publicId = match[1]
      }
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId)
    }

    await prisma.image.delete({
      where: { id }
    })

    return { ok: true }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error eliminando imagen'
    })
  }
})

