import bcrypt from 'bcryptjs'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: 'Datos incompletos'
      })
    }

    const existe = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (existe) {
      throw createError({
        statusCode: 400,
        message: 'Este correo ya está registrado'
      })
    }

    const hash = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hash
      }
    })

    return {
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    }

  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error en el servidor'
    })
  }
})