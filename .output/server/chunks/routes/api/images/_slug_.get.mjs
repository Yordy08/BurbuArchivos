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

const _slug__get = defineEventHandler(async (event) => {
  try {
    const slug = event.context.params.slug;
    const image = await prisma.image.findUnique({
      where: { slug },
      include: {
        user: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
    if (!image) {
      throw createError({ statusCode: 404, statusMessage: "Imagen no encontrada" });
    }
    return image;
  } catch (err) {
    console.error("Error fetching image:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : "Error obteniendo imagen"
    });
  }
});

export { _slug__get as default };
//# sourceMappingURL=_slug_.get.mjs.map
