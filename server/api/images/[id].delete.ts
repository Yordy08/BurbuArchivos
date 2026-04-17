import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {

  const id = event.context.params?.id

  try {
    await prisma.image.delete({
      where: { id }
    })

    return {
      ok: true
    }
  } catch (error) {
    // Manejar el caso de que el registro no exista (Error P2025 de Prisma)
    throw createError({
      statusCode: 404,
      statusMessage: 'No se pudo eliminar: La imagen no existe'
    })
  }
})