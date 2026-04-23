import { prisma } from '~/server/utils/prisma'
import bcrypt from 'bcryptjs'
import { setCookie } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { email, password } = body

  const user = await prisma.user.findUnique({
    where: { email }
  })

  // Comprobar la contraseña usando bcrypt
  const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false

  if (!user || !isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Credenciales inválidas'
    })
  }

  // sesión simple (NO JWT aún)
  setCookie(event, 'auth_token', String(user.id), {
    httpOnly: true,
    secure: false
  })

  return {
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
})