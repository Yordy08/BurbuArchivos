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
            id: true,        // 🔥 ESTO FALTABA
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return images.map(img => ({
      ...img,
      updatedAt: img.updatedAt ?? img.createdAt
    }))

  } catch (error: any) {
    console.error(error)

    return {
      error: true,
      message: error.message || 'Error interno'
    }
  }
})