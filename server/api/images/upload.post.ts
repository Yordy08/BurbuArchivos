import { prisma } from '~/server/utils/prisma'
import {
  readMultipartFormData,
  getCookie,
  createError,
  defineEventHandler
} from 'h3'

import { v2 as cloudinary } from 'cloudinary'
import slugify from 'slugify'

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

    const form = await readMultipartFormData(event, {
      maxTotalSize: 50 * 1024 * 1024, // 50MB total
      maxFileSize: 10 * 1024 * 1024,  // 10MB per file
    })

    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Formulario vacío'
      })
    }

    const title =
      form.find(f => f.name === 'title')?.data?.toString() || ''

    const visibility =
      form.find(f => f.name === 'visibility')?.data?.toString() || 'public'

    const downloadable =
      form.find(f => f.name === 'downloadable')?.data?.toString() === 'true'

    const seoEnabled =
      form.find(f => f.name === 'seoEnabled')?.data?.toString() === 'true'

    const files = form.filter(f => f.name === 'images')

    // Check individual file sizes
    const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
    for (const file of files) {
      if (file.data.length > MAX_FILE_SIZE) {
        throw createError({
          statusCode: 400,
          statusMessage: `Imagen demasiado grande: ${Math.round(file.data.length / 1024 / 1024)}MB (máx 10MB)`
        })
      }
    }

    if (!files.length) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No seleccionaste imágenes'
      })
    }

    const images = await Promise.all(
      files.map(async (file, index) => {
        const uploadResult: any = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'burbuarchivos',
              public_id: `image_${Date.now()}_${index}`,
              resource_type: 'image',
              max_file_size: 10 * 1024 * 1024 // 10MB Cloudinary limit
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(file.data)
        })

        const baseSlug = slugify(title || 'imagen', {
          lower: true,
          strict: true
        })

        const slug = `${baseSlug}-${Date.now()}-${index}`

        return prisma.image.create({
          data: {
            title,
            slug,
            urlOriginal: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            visibility,
            downloadable,
            seoEnabled,
            userId: user.id
          }
        })
      })
    )

    return {
      ok: true,
      total: images.length,
      images
    }

  } catch (err: any) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || 'Error al subir imágenes'
    })
  }
})

