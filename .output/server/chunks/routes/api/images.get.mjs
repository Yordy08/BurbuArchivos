import { d as defineEventHandler, p as prisma } from '../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const images_get = defineEventHandler(async () => {
  try {
    const images = await prisma.image.findMany({
      where: {
        visibility: "public"
      },
      include: {
        user: {
          select: {
            id: true,
            // 🔥 ESTO FALTABA
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });
    return images.map((img) => {
      var _a;
      return {
        ...img,
        updatedAt: (_a = img.updatedAt) != null ? _a : img.createdAt
      };
    });
  } catch (error) {
    console.error(error);
    return {
      error: true,
      message: error.message || "Error interno"
    };
  }
});

export { images_get as default };
//# sourceMappingURL=images.get.mjs.map
