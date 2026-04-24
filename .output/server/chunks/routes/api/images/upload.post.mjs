import { d as defineEventHandler, g as getCookie, c as createError, p as prisma, e as readMultipartFormData, u as useRuntimeConfig } from '../../../_/nitro.mjs';
import { v2 } from 'cloudinary';
import slugify from 'slugify';
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
const upload_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  try {
    const userId = getCookie(event, "auth_token");
    if (!userId) {
      throw createError({
        statusCode: 401,
        statusMessage: "No autorizado"
      });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: "Usuario no encontrado"
      });
    }
    const form = await readMultipartFormData(event);
    if (!form) {
      throw createError({
        statusCode: 400,
        statusMessage: "Formulario vac\xEDo"
      });
    }
    const title = ((_b = (_a = form.find((f) => f.name === "title")) == null ? void 0 : _a.data) == null ? void 0 : _b.toString()) || "";
    const visibility = ((_d = (_c = form.find((f) => f.name === "visibility")) == null ? void 0 : _c.data) == null ? void 0 : _d.toString()) || "public";
    const downloadable = ((_f = (_e = form.find((f) => f.name === "downloadable")) == null ? void 0 : _e.data) == null ? void 0 : _f.toString()) === "true";
    const seoEnabled = ((_h = (_g = form.find((f) => f.name === "seoEnabled")) == null ? void 0 : _g.data) == null ? void 0 : _h.toString()) === "true";
    const files = form.filter((f) => f.name === "images");
    if (!files.length) {
      throw createError({
        statusCode: 400,
        statusMessage: "No seleccionaste im\xE1genes"
      });
    }
    const images = await Promise.all(
      files.map(async (file, index) => {
        const uploadResult = await new Promise((resolve, reject) => {
          v2.uploader.upload_stream(
            {
              folder: "burbuarchivos",
              public_id: `image_${Date.now()}_${index}`,
              resource_type: "image"
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(file.data);
        });
        const baseSlug = slugify(title || "imagen", {
          lower: true,
          strict: true
        });
        const slug = `${baseSlug}-${Date.now()}-${index}`;
        return prisma.image.create({
          data: {
            title,
            slug,
            urlOriginal: uploadResult.secure_url,
            publicId: uploadResult.public_id,
            visibility,
            downloadable,
            seoEnabled,
            userId: user.id
          }
        });
      })
    );
    return {
      ok: true,
      total: images.length,
      images
    };
  } catch (err) {
    throw createError({
      statusCode: err.statusCode || 500,
      statusMessage: err.statusMessage || err.message || "Error al subir im\xE1genes"
    });
  }
});

export { upload_post as default };
//# sourceMappingURL=upload.post.mjs.map
