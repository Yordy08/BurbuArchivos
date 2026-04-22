import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const slug = event.context.params.slug

    const image = await prisma.image.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    })

    if (!image) {
      throw createError({ statusCode: 404, statusMessage: 'Imagen no encontrada' })
    }

    return image
  } catch (err) {
    console.error('Error fetching image:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error obteniendo imagen'
    })
  }
})