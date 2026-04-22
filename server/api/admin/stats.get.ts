import { prisma } from '~/server/utils/prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  try {
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

    // Obtener total de descargas
    const images = await prisma.image.findMany({
      where: { userId },
      select: { downloads: true }
    })

    const totalDownloads = images.reduce((sum, img) => sum + img.downloads, 0)

    // Contar logins (simplificado: solo count de usuarios)
    const totalUsers = await prisma.user.count()

    return {
      totalImages: images.length,
      totalDownloads,
      totalUsers,
      lastLogin: user.lastLogin,
      user: {
        name: user.name,
        email: user.email
      }
    }
  } catch (err) {
    console.error('Admin stats error:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error obteniendo estadísticas'
    })
  }
})