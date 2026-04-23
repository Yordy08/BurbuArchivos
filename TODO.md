# Plan de implementación - AdminPro

1. [x] Actualizar `server/api/admin/users.get.ts` para incluir `totalUsers`
2. [x] Crear `server/api/admin/users/[id].put.ts` para editar usuario (nombre, email, rol, contraseña opcional)
3. [x] Crear `server/api/admin/users/[id]/reset-password.post.ts` para resetear contraseña
4. [x] Actualizar `pages/adminpro.vue`:
   - Usar `totalUsers` de la API
   - Agregar campo de contraseña editable
   - Enviar contraseña en `updateUser`
   - Mostrar alertas de éxito/error
5. [ ] Probar cambios

