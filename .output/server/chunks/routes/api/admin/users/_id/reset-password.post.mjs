import { d as defineEventHandler, c as createError, p as prisma } from '../../../../../_/nitro.mjs';
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

const resetPassword_post = defineEventHandler(async (event) => {
  var _a;
  const user = event.context.user;
  if (!user || user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "Forbidden" });
  }
  const id = (_a = event.context.params) == null ? void 0 : _a.id;
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: "ID requerido" });
  }
  const newPassword = "12345678";
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id },
    data: {
      password: hashed
    }
  });
  return {
    success: true,
    message: "Contrase\xF1a reseteada",
    tempPassword: newPassword
  };
});

export { resetPassword_post as default };
//# sourceMappingURL=reset-password.post.mjs.map
