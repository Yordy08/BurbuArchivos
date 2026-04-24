import { prisma } from '~/server/utils/prisma'
import { getCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'auth_token')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      images: {
        select: {
          id: true,
          title: true,
          slug: true,
          urlOriginal: true,
          downloads: true,
          createdAt: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Usuario no encontrado' })
  }

  return { user }
}) 

/// Nota: este endpoint es para obtener los datos del usuario autenticado, no para listar usuarios.