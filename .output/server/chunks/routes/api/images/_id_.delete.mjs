import { d as defineEventHandler, g as getCookie, c as createError, p as prisma, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { v2 } from 'cloudinary';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const config = useRuntimeConfig();
v2.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});
const _id__delete = defineEventHandler(async (event) => {
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
      throw createError({ statusCode: 403, statusMessage: "No tienes permiso para eliminar esta imagen" });
    }
    let publicId = image.publicId;
    if (!publicId && image.urlOriginal) {
      const match = image.urlOriginal.match(/\/upload\/v\d+\/(.+)\./);
      if (match && match[1]) {
        publicId = match[1];
      }
    }
    if (publicId) {
      await v2.uploader.destroy(publicId);
    }
    await prisma.image.delete({
      where: { id }
    });
    return { ok: true };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || "Error eliminando imagen"
    });
  }
});

export { _id__delete as default };
//# sourceMappingURL=_id_.delete.mjs.map
