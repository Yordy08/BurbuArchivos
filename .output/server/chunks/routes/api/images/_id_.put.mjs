import { d as defineEventHandler, g as getCookie, c as createError, p as prisma, r as readBody } from '../../../_/nitro.mjs';
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
    const id = (_a = event.context.params) == null ? void 0 : _a.id;
    if (!id) {
      throw createError({ statusCode: 400, statusMessage: "ID no v\xE1lido" });
    }
    const image = await prisma.image.findUnique({
      where: { id }
    });
    if (!image) {
      throw createError({ statusCode: 404, statusMessage: "La imagen no existe" });
    }
    if (image.userId !== userId) {
      throw createError({ statusCode: 403, statusMessage: "No tienes permiso para editar esta imagen" });
    }
    const body = await readBody(event);
    const { title, visibility, downloadable, seoEnabled } = body || {};
    const updatedImage = await prisma.image.update({
      where: { id },
      data: {
        title,
        visibility,
        downloadable,
        seoEnabled
      }
    });
    return {
      ok: true,
      image: updatedImage
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Error actualizando imagen"
    });
  }
});

export { _id__put as default };
//# sourceMappingURL=_id_.put.mjs.map
