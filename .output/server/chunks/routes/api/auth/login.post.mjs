import { d as defineEventHandler, r as readBody, p as prisma, c as createError, s as setCookie } from '../../../_/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password } = body;
  const user = await prisma.user.findUnique({
    where: { email }
  });
  const isPasswordCorrect = user ? await bcrypt.compare(password, user.password) : false;
  if (!user || !isPasswordCorrect) {
    throw createError({
      statusCode: 401,
      statusMessage: "Credenciales inv\xE1lidas"
    });
  }
  setCookie(event, "auth_token", String(user.id), {
    httpOnly: true,
    secure: false
  });
  return {
    ok: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
