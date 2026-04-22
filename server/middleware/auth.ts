import { defineEventHandler, getCookie, createError } from 'h3'
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const path = event.path || ''

  // ✅ Rutas públicas
  const publicRoutes = [
    '/',
    '/login',
    '/register',
    '/api/login',
    '/api/register'
  ]

  // ✅ Permitir páginas públicas y archivos internos de Nuxt
  if (
    publicRoutes.includes(path) ||
    path.startsWith('/_nuxt/') ||
    path.startsWith('/favicon') ||
    path.startsWith('/images/') ||
    path.startsWith('/public/')
  ) {
    return
  }

  const userId = getCookie(event, 'auth_token')

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No autorizado - login requerido'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesión inválida'
    })
  }

  // ✅ Guardar usuario en contexto
  event.context.userId = user.id
})