import { prisma } from '~/server/utils/prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, 'auth_token')
    
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
    }

    const images = await prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return images
  } catch (err) {
    console.error('Get user images error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error obteniendo imágenes'
    })
  }
})