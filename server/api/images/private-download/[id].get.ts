import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event)=>{

  const id = event.context.params?.id

  const image = await prisma.image.findUnique({
    where:{ id }
  })

  if(!image){
    throw createError({
      statusCode: 404,
      statusMessage: 'Imagen no encontrada'
    })
  }

  if(image.visibility === 'private'){
    return sendRedirect(event, '/login')
  }

  return sendRedirect(event, image.url)
})