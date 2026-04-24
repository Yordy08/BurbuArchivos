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

const stats_get = defineEventHandler(async (event) => {
  try {
    const userId = getCookie(event, "auth_token");
    if (!userId) {
      throw createError({ statusCode: 401, statusMessage: "No autorizado" });
    }
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: "Usuario no encontrado" });
    }
    const images = await prisma.image.findMany({
      where: { userId },
      select: { downloads: true }
    });
    const totalDownloads = images.reduce((sum, img) => sum + img.downloads, 0);
    const totalUsers = await prisma.user.count();
    return {
      totalImages: images.length,
      totalDownloads,
      totalUsers,
      lastLogin: user.lastLogin,
      user: {
        name: user.name,
        email: user.email
      }
    };
  } catch (err) {
    console.error("Admin stats error:", err);
    throw createError({
      statusCode: 500,
      statusMessage: err instanceof Error ? err.message : "Error obteniendo estad\xEDsticas"
    });
  }
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
