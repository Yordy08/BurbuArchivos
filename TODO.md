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

## Upload + Galería completados ✅

**Subir.vue**:
- ✅ Form simple: Título + Imágenes
- ✅ Defaults ocultos (public, descarga, SEO)
- ✅ Preview X remove + roja heaviest
- ✅ Límites 50MB/10MB

**Galeria.vue** **nueva**:
- ✅ Álbumes por **título** (igual nombre = carpeta)
- ✅ Cards folder 📁 + count
- ✅ Modal álbum → grid imgs → modal full + download
- ✅ Responsive + danger theme

**Prueba**:
- `/subir` → up imgs same title
- `/galeria` → folders by title, explore!

¡Sistema galería completo!

