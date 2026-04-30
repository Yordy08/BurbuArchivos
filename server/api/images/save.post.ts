import { prisma } from '~/server/utils/prisma'
import {
  readBody,
  getCookie,
  createError,
  defineEventHandler
} from 'h3'

import slugify from 'slugify'

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
    const { 
      title, 
      cloudinaryUrl, 
      publicId, 
      visibility = 'public',
      downloadable = false,
      seoEnabled = false
    } = body

    if (!title || !cloudinaryUrl) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Título y URL de Cloudinary requeridos'
      })
    }

    // Validate URL is from Cloudinary
    if (!cloudinaryUrl.includes('cloudinary.com')) {
      throw createError({
        statusCode: 400,
        statusMessage: 'URL inválida. Debe ser de Cloudinary.'
      })
    }

    // Generate unique slug
    const baseSlug = slugify(title, {
      lower: true,
      strict: true
    })
    const slug = `${baseSlug}-${Date.now()}`

    const image = await prisma.image.create({
      data: {
        title,
        slug,
        urlOriginal: cloudinaryUrl,
        publicId: publicId || null,
        visibility,
        downloadable,
        seoEnabled,
        userId: user.id
      }
    })

    return {
      ok: true,
      image
    }

  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || 'Error al guardar imagen'
    })
  }
})
