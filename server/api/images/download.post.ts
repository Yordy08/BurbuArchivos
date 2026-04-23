import { prisma } from '~/server/utils/prisma'
import { readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const image = await prisma.image.update({
    where: { id: body.id },
    data: {
      downloads: {
        increment: 1
      }
    }
  })

  return {
    downloads: image.downloads
  }
})