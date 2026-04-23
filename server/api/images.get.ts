import { defineEventHandler } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async () => {
  try {
    const images = await prisma.image.findMany({
      where: {
        visibility: 'public'
      },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 🔥 PROTECCIÓN: eliminar corruptos sin romper el API
    const safeImages = images.map(img => ({
      ...img,
      updatedAt: img.updatedAt ?? img.createdAt // fallback seguro
    }))

    return safeImages

  } catch (error: any) {
    console.error(error)

    return {
      error: true,
      message: error.message || 'Error interno'
    }
  }
})