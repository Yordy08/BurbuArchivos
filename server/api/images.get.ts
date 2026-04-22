import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async (event) => {
  const images = await prisma.image.findMany({
    where: {
      visibility: 'public'
    },
    include: {
      user: {
        select: {
          name: true,
          email: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return images
})