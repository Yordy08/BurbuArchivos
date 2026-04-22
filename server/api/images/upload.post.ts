import { prisma } from '~/server/utils/prisma'
import { readMultipartFormData, getCookie } from 'h3'
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
    // Check auth
    const userId = getCookie(event, 'auth_token')
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Usuario no encontrado' })
    }

    const form = await readMultipartFormData(event)

    if (!form) {
      throw createError({ statusCode: 400, statusMessage: 'No data' })
    }

    const title = form.find(f => f.name === 'title')?.data?.toString() || ''
    const visibility = form.find(f => f.name === 'visibility')?.data?.toString() || 'public'

    const downloadable = form.find(f => f.name === 'downloadable')?.data?.toString() === 'true'
    const seoEnabled = form.find(f => f.name === 'seoEnabled')?.data?.toString() === 'true'

    const files = form.filter(f => f.name === 'images')

    if (!files.length) {
      throw createError({ statusCode: 400, statusMessage: 'No images' })
    }

    const images = await Promise.all(
      files.map(async (file, index) => {

        // Upload to Cloudinary
        const uploadResult = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            {
              folder: 'burbuarchivos',
              public_id: `image_${Date.now()}_${index}`,
              resource_type: 'image'
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          ).end(file.data)
        })

        // Generate unique slug
        const baseSlug = slugify(title || 'image', { lower: true, strict: true })
        const timestamp = Date.now()
        const slug = `${baseSlug}-${timestamp}-${index}`

        return prisma.image.create({
          data: {
            title,
            slug,
            urlOriginal: uploadResult.secure_url,
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

  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error subiendo imágenes'
    })
  }
})
