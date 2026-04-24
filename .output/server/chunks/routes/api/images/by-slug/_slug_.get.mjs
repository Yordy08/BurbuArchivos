import { d as defineEventHandler, g as getCookie, p as prisma, c as createError } from '../../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const _slug__get = defineEventHandler(async (event) => {
  var _a;
  const slug = (_a = event.context.params) == null ? void 0 : _a.slug;
  const userId = getCookie(event, "auth_token");
  console.log("\u{1F50D} SLUG:", slug);
  console.log("\u{1F464} USER:", userId);
  const whereConditions = {
    slug,
    OR: [
      { visibility: "public" }
      // Permite imágenes públicas
    ]
  };
  if (userId) {
    whereConditions.OR.push({ userId });
  }
  const image = await prisma.image.findFirst({
    where: whereConditions,
    include: {
      user: true
    }
  });
  if (!image) {
    throw createError({
      statusCode: 404,
      statusMessage: "Imagen no encontrada"
    });
  }
  return image;
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
