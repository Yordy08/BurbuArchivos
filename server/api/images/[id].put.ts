import { prisma } from '~/server/utils/prisma'
import { getCookie, createError, defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, 'auth_token')

    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: 'No autorizado' })
    }

    const id = event.context.params?.id

    if (!id) {
      throw createError({ statusCode: 400, statusMessage: 'ID no válido' })
    }

    const image = await prisma.image.findUnique({
      where: { id }
    })

    if (!image) {
      throw createError({ statusCode: 404, statusMessage: 'La imagen no existe' })
    }

    if (image.userId !== userId) {
      throw createError({ statusCode: 403, statusMessage: 'No tienes permiso para editar esta imagen' })
    }

    const body = await readBody(event)
    const { title, visibility, downloadable, seoEnabled } = body || {}

    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        title,
        visibility,
        downloadable,
        seoEnabled
      }
    })

    return {
      ok: true,
      image: updatedImage
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Error actualizando imagen'
    })
  }
})

