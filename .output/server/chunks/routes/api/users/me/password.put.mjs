import { d as defineEventHandler, g as getCookie, c as createError, r as readBody, p as prisma } from '../../../../_/nitro.mjs';
import bcrypt from 'bcryptjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@prisma/client';

const password_put = defineEventHandler(async (event) => {
  const userId = getCookie(event, "auth_token");
  if (!userId) {
    throw createError({ statusCode: 401, statusMessage: "No autorizado" });
  }
  const body = await readBody(event);
  if (!body.currentPassword || !body.newPassword || !body.confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: "Todos los campos son requeridos" });
  }
  if (body.newPassword !== body.confirmPassword) {
    throw createError({ statusCode: 400, statusMessage: "Las contrase\xF1as no coinciden" });
  }
  if (body.newPassword.length < 6) {
    throw createError({ statusCode: 400, statusMessage: "La nueva contrase\xF1a debe tener al menos 6 caracteres" });
  }
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "Usuario no encontrado" });
  }
  const isPasswordCorrect = await bcrypt.compare(body.currentPassword, user.password);
  if (!isPasswordCorrect) {
    throw createError({ statusCode: 400, statusMessage: "Contrase\xF1a actual incorrecta" });
  }
  const hashed = await bcrypt.hash(body.newPassword, 10);
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashed }
  });
  return { success: true, message: "Contrase\xF1a actualizada correctamente" };
});

export { password_put as default };
//# sourceMappingURL=password.put.mjs.map
