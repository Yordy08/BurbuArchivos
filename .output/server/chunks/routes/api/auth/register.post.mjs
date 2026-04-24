import { d as defineEventHandler, r as readBody, c as createError, p as prisma } from '../../../_/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    if (!body.email || !body.password) {
      throw createError({
        statusCode: 400,
        message: "Datos incompletos"
      });
    }
    const existe = await prisma.user.findUnique({
      where: { email: body.email }
    });
    if (existe) {
      throw createError({
        statusCode: 400,
        message: "Este correo ya est\xE1 registrado"
      });
    }
    const hash = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hash
      }
    });
    return {
      ok: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    };
  } catch (error) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || "Error en el servidor"
    });
  }
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
