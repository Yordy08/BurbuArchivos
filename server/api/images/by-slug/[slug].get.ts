import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const slug = event.context.params?.slug

  const image = await prisma.image.findUnique({
    where: { slug },
    include: {
      user: {
        select: {
          name: true
        }
      }
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