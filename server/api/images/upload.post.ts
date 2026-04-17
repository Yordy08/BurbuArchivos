import { prisma } from '~/server/utils/prisma'
import { readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  try {

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

        // 🔥 FIX IMPORTANTE: filename puede no existir
        const filename =
          file.filename ||
          `image_${Date.now()}_${index}.jpg`

        return prisma.image.create({
          data: {
            title,
            url: `/uploads/${filename}`,
            visibility,
            downloadable,
            seoEnabled
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
    console.error('🔥 UPLOAD ERROR REAL:', err)

    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error subiendo imágenes'
    })
  }
})