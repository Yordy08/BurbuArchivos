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

const images_get = defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, "auth_token");
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }
    const images = await prisma.image.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
    return images;
  } catch (err) {
    console.error("Get user images error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : "Error obteniendo im\xE1genes"
    });
  }
});

export { images_get as default };
//# sourceMappingURL=images.get.mjs.map
