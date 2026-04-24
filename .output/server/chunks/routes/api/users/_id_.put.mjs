import { d as defineEventHandler, c as createError, r as readBody, p as prisma } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const _id__put = defineEventHandler(async (event) => {
  var _a;
  const user = event.context.user;
  if (!user || user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const body = await readBody(event);
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID requerido" });
  }
  const updated = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
      role: body.role
    }
  });
  return { success: true, user: updated };
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
