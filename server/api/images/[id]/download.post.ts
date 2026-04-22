import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const imageId = event.context.params.id

    const image = await prisma.image.update({
      where: { id: imageId },
      data: {
        downloads: {
          increment: 1
        }
      }
    })

    return { ok: true, downloads: image.downloads }
  } catch (err) {
    console.error('Error incrementing downloads:', err)
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : 'Error registrando descarga'
    })
  }
})