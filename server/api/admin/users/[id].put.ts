import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const id = event.context.params?.id
  const body = await readBody(event)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID requerido' })
  }

  const data: any = {
    name: body.name,
    email: body.email,
    role: body.role
  }

  // Si se envía una contraseña nueva, la hasheamos
  if (body.password && body.password.trim().length > 0) {
    data.password = await bcrypt.hash(body.password.trim(), 10)
  }

  const updated = await prisma.user.update({
    where: { id },
    data
  })

  return { success: true, user: updated }
})

