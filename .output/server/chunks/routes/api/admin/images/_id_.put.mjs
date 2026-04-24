import { d as defineEventHandler, g as getCookie, c as createError, r as readBody, p as prisma } from '../../../../_/nitro.mjs';
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
  try {
    const userId = getCookie(event, "auth_token");
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }
    const imageId = (_a = event.context.params) == null ? void 0 : _a.id;
    if (!imageId) {
      throw createError({ statusCode: 400, statusMessage: "ID de imagen no proporcionado" });
    }
    const body = await readBody(event);
    const { title, visibility, downloadable, seoEnabled } = body || {};
    const image = await prisma.image.findUnique({
      where: { id: imageId }
    });
    if (!image || image.userId !== userId) {
      throw createError({ statusCode: 403, statusMessage: "No tienes permiso para editar esta imagen" });
    }
    const updatedImage = await prisma.image.update({
      where: { id: imageId },
      data: {
        title,
        visibility,
        downloadable,
        seoEnabled
      }
    });
    return updatedImage;
  } catch (err) {
    console.error("Update image error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : "Error actualizando imagen"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
