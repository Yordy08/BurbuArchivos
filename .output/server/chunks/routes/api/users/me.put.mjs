import { d as defineEventHandler, g as getCookie, c as createError, r as readBody, p as prisma } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const me_put = defineEventHandler(async (event) => {
  const userId = getCookie(event, "auth_token");
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "No autorizado" });
  }
  const body = await readBody(event);
  if (!body.name || !body.email) {
    throw createError({ statusCode: 400, statusMessage: "Nombre y correo son requeridos" });
  }
  const existing = await prisma.user.findUnique({
    where: { email: body.email }
  });
  if (existing && existing.id !== userId) {
    throw createError({ statusCode: 400, statusMessage: "Este correo ya est\xE1 en uso" });
  }
  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      name: body.name,
      email: body.email
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
  return { success: true, user: updated };
});

export { me_put as default };
//# sourceMappingURL=me.put.mjs.map
