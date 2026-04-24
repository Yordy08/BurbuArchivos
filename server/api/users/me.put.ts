import { defineEventHandler, readBody, createError, getCookie } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'auth_token')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
  }

  const body = await readBody(event)

  if (!body.name || !body.email) {
    throw createError({ statusCode: 400, statusMessage: 'Nombre y correo son requeridos' })
  }

  // Verificar que el email no esté en uso por otro usuario
  const existing = await prisma.user.findUnique({
    where: { email: body.email }
  })

  if (existing && existing.id !== userId) {
    throw createError({ statusCode: 400, statusMessage: 'Este correo ya está en uso' })
  }

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
      email: body.email
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  })

  return { success: true, user: updated }
})

