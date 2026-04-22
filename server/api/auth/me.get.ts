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
      role: true
    }
  })

  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Usuario no encontrado' })
  }

  return { user }
})