import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const id = event.context.params?.id
  const body = await readBody(event)

  try {
    const image = await prisma.image.update({
      where: { id },
      data: {
        title: body.title,
        visibility: body.visibility,
        downloadable: body.downloadable,
        seoEnabled: body.seoEnabled
      }
    })

    return {
      ok: true,
      image
    }
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: 'No se pudo actualizar: La imagen no existe'
    })
  }
})