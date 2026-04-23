import { defineEventHandler, createError } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const user = event.context.user

  // 🔒 SOLO ADMIN
  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          images: true
        }
      }
    }
  })

  // 🔢 estadísticas globales
  const totalImages = await prisma.image.count()

  const totalLogins = await prisma.loginLog.count()

  return {
    users,
    totalImages,
    totalLogins
  }
})