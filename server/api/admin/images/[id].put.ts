import { prisma } from '~/server/utils/prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, 'auth_token')
    
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
    }

    const imageId = event.context.params?.id

    if (!imageId) {
      throw createError({ statusCode: 400, statusMessage: 'ID de imagen no proporcionado' })
    }

    const body = await readBody(event)
    const { title, visibility, downloadable, seoEnabled } = body || {}

    // Verificar que la imagen pertenece al usuario
    const image = await prisma.image.findUnique({
      where: { id: imageId }
    })

    if (!image || image.userId !== userId) {
      throw createError({ statusCode: 403, statusMessage: 'No tienes permiso para editar esta imagen' })
    }

    const updatedImage = await prisma.image.update({
      where: { id: imageId },
      data: {
        title,
        visibility,
        downloadable,
        seoEnabled
      }
    })

    return updatedImage
  } catch (err) {
    console.error('Update image error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error actualizando imagen'
    })
  }
})