import { d as defineEventHandler, p as prisma, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const _id__get = defineEventHandler(async (event) => {
  var _a;
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  const image = await prisma.image.findUnique({
    where: { id }
  });
  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: "La imagen solicitada no existe"
    });
  }
  return {
    ok: true,
    image
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
