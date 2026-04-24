import { defineEventHandler, readBody, createError, getCookie } from 'h3'
import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const userId = getCookie(event, 'auth_token')

  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
  }

  const body = await readBody(event)

  if (!body.currentPassword || !body.newPassword || !body.confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Todos los campos son requeridos' })
  }

  if (body.newPassword !== body.confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Las contraseñas no coinciden' })
  }

  if (body.newPassword.length < 6) {
    throw createError({ statusCode: 400, statusMessage: 'La nueva contraseña debe tener al menos 6 caracteres' })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'Usuario no encontrado' })
  }

  const isPasswordCorrect = await bcrypt.compare(body.currentPassword, user.password)

  if (!isPasswordCorrect) {
    throw createError({ statusCode: 400, statusMessage: 'Contraseña actual incorrecta' })
  }

  const hashed = await bcrypt.hash(body.newPassword, 10)

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  })

  return { success: true, message: 'Contraseña actualizada correctamente' }
})

