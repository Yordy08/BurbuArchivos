import { d as defineEventHandler, c as createError, p as prisma } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const users_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user || user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: {
          images: true
        }
      }
    }
  });
  const totalImages = await prisma.image.count();
  const totalUsers = await prisma.user.count();
  return {
    users,
    totalImages,
    totalUsers
  };
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
