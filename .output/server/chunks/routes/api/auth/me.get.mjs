import { d as defineEventHandler, g as getCookie, c as createError, p as prisma } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const me_get = defineEventHandler(async (event) => {
  const userId = getCookie(event, "auth_token");
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "No autorizado" });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      images: {
        select: {
          id: true,
          title: true,
          slug: true,
          urlOriginal: true,
          downloads: true,
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "Usuario no encontrado" });
  }
  return { user };
});

export { me_get as default };
//# sourceMappingURL=me.get.mjs.map
