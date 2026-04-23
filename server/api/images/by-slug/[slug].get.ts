import { prisma } from '~/server/utils/prisma'
import { getCookie, createError } from 'h3'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug
  const userId = getCookie(event, 'auth_token')

  console.log('🔍 SLUG:', slug)
  console.log('👤 USER:', userId)

  const whereConditions: any = {
    slug: slug,
    OR: [
      { visibility: 'public' } // Permite imágenes públicas
    ]
  }

  // Si hay un userId, añade la condición para permitir las imágenes propias del usuario
  if (userId) {
    whereConditions.OR.push({ userId: userId })
  }

  const image = await prisma.image.findFirst({
    where: whereConditions,
    include: {
      user: true
    }
  })

  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Imagen no encontrada'
    })
  }

  return image
})