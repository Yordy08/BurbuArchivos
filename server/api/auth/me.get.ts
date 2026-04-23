import { defineEventHandler, getCookie, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

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
      where: {
        id: userId
      },

      include: {
        images: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Usuario no encontrado'
      })
    }

    return user

  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error interno'
    })
  }
})