import { defineEventHandler, getCookie, createError } from 'h3'
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const path = event.path || ''

  // ✅ TODAS las rutas públicas
  const publicPaths = [
    '/',
    '/login',
    '/register',
    '/acerca',
    '/privacidad',
    '/terminos'
  ]

  // ✅ Permitir frontend y APIs públicas
  if (
    publicPaths.includes(path) ||
    path.startsWith('/_nuxt/') ||
    path.startsWith('/favicon') ||
    path.startsWith('/api/auth/login') ||
    path.startsWith('/api/auth/register') ||
    path.startsWith('/api/auth/me') ||
    path.startsWith('/api/images') ||
    path.startsWith('/foto/')
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
    select: { id: true, role: true }
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Sesión inválida'
    })
  }

  event.context.userId = user.id
  event.context.user = user
})
