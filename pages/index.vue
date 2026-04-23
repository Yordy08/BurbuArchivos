<!-- pages/index.vue -->
<template>
  <div class="container-fluid min-vh-100 bg-light">

    <!-- GALERÍA -->
    <section class="py-5 bg-white">
      <div class="container">

        <div class="text-center mb-5">
          <h1 class="fw-bold text-danger display-5">
            🖼️ Galería Pública
          </h1>

          <p class="text-muted">
            Explora imágenes compartidas por toda la comunidad
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-danger"></div>
        </div>

        <!-- Sin imágenes -->
        <div
          v-else-if="images.length === 0"
          class="alert alert-warning text-center"
        >
          No hay imágenes disponibles.
        </div>

        <!-- GRID -->
        <div v-else class="row g-4">

          <div
            v-for="image in images"
            :key="image.id"
            class="col-md-6 col-lg-4 col-xl-3"
          >
            <div class="card shadow border-0 h-100 hover-card">

              <!-- Imagen -->
              <img
                :src="image.urlOriginal"
                :alt="image.title"
                class="card-img-top"
                style="height:220px;object-fit:cover;"
              />

              <!-- Body -->
              <div class="card-body d-flex flex-column">

                <h5 class="fw-bold text-danger">
                  {{ image.title }}
                </h5>

                <p class="small text-muted mb-1">
                  👤 {{ image.user?.name || 'Usuario' }}
                </p>

                <p class="small text-muted mb-2">
                  ⬇ {{ image.downloads }} descargas
                </p>

                <div class="mt-auto d-grid gap-2">

                  <!-- Ver -->
                  <NuxtLink
                    :to="`/foto/${image.slug}`"
                    class="btn btn-outline-dark rounded-pill"
                  >
                    👁 Ver Imagen
                  </NuxtLink>

                  <!-- Descargar -->
                  <button
                    v-if="image.downloadable"
                    type="button"
                    @click.prevent="downloadImage(image)"
                    class="btn btn-danger rounded-pill"
                  >
                    ⬇ Descargar
                  </button>

                  <!-- Bloqueado -->
                  <button
                    v-else
                    type="button"
                    disabled
                    class="btn btn-secondary rounded-pill"
                  >
                    ❌ Descarga bloqueada
                  </button>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>

    <!-- FOOTER -->
    <footer class="bg-dark text-white py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">
          © 2026 BurbuArchivo - Todos los derechos reservados
        </p>
      </div>
    </footer>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const loading = ref(true)

/* CARGAR IMÁGENES */
onMounted(async () => {
  await loadImages()
})

const loadImages = async () => {
  try {
    loading.value = true

    const res = await fetch('/api/images')

    if (!res.ok) {
      throw new Error('Error cargando imágenes')
    }

    images.value = await res.json()

  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

/* DESCARGAR */
const downloadImage = async (image) => {
  try {
    /* Guardar descarga en BD */
    const res = await fetch('/api/images/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: image.id
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.statusMessage || 'No se pudo registrar descarga')
    }

    /* Actualizar contador real */
    image.downloads = data.downloads

    /* Descargar imagen real */
    const link = document.createElement('a')

    link.href = image.urlOriginal.replace(
      '/upload/',
      '/upload/fl_attachment/'
    )

    link.target = '_blank'
    link.rel = 'noopener'

    document.body.appendChild(link)
    link.click()
    link.remove()

  } catch (error) {
    console.error(error)
    alert(error.message)
  }
}
</script>

<style scoped>
.hover-card{
  transition:0.3s ease;
}

.hover-card:hover{
  transform:translateY(-5px);
  box-shadow:0 10px 25px rgba(0,0,0,.15);
}
</style>