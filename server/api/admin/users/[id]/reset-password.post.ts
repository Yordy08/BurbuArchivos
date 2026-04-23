import { defineEventHandler, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const id = event.context.params?.id

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requerido' })
  }

  // 🔑 contraseña temporal
  const newPassword = '12345678'
  const hashed = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id },
    data: {
      password: hashed
    }
  })

  return {
    success: true,
    message: 'Contraseña reseteada',
    tempPassword: newPassword
  }
})

