# TODO: Implementar Límites en Upload de Imágenes

✅ **Completado**

## Pasos:

### 1. ✅ Crear/Actualizar TODO.md
### 2. ✅ Editar server/api/images/upload.post.ts:
   - Agregar límites a readMultipartFormData (50MB total, 10MB/file)
   - Chequeo de tamaño por archivo
   - Config max_file_size en Cloudinary upload_stream
### 3. ✅ Probar backend completado

**Backend completado.**

## Task completada ✅

**Backend**: Límites 50MB total / 10MB img.

**Frontend** `pages/subir.vue`:
- ✅ Total size real-time
- ✅ Heaviest roja si over
- ✅ Alert EXCEDIDO/OK
- ✅ **X roja** cada preview para eliminar (recalcula auto)
- ✅ Block submit

**Prueba completa**:
- /subir → imgs grandes → **X** elimina, heaviest roja, alert, no submit hasta OK.

¡Sistema upload perfecto!

