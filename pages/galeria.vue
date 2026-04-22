<template>
  <div class="container py-5">

    <!-- TITULO -->
    <div class="text-center mb-5">
      <h1 class="fw-bold text-danger display-4">
        🖼️ Galería de Imágenes
      </h1>
      <p class="text-muted">
        Explora, descarga y visualiza imágenes
      </p>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-5">
      <div
        class="spinner-border text-danger"
        style="width:4rem;height:4rem;"
      >
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- SIN IMÁGENES -->
    <div
      v-else-if="images.length === 0"
      class="alert alert-warning text-center"
    >
      No hay imágenes disponibles.
    </div>

    <!-- GALERÍA -->
    <div v-else class="row g-4">

      <div
        v-for="image in images"
        :key="image.id"
        class="col-md-6 col-lg-4 col-xl-3"
      >
        <div class="card h-100 shadow border-0">

          <!-- FOTO -->
          <img
            :src="image.urlOriginal"
            :alt="image.title"
            class="card-img-top"
            style="height:220px; object-fit:cover;"
          />

          <!-- CONTENIDO -->
          <div class="card-body d-flex flex-column">

            <h5 class="card-title text-danger fw-bold">
              {{ image.title }}
            </h5>

            <p class="small text-muted mb-1">
              👤 {{ image.user?.name || 'Usuario' }}
            </p>

            <p class="small text-muted">
              📅 {{ formatDate(image.createdAt) }}
            </p>

            <!-- BOTONES -->
            <div class="mt-auto d-grid gap-2">

              <button
                v-if="image.downloadable"
                @click="downloadImage(image)"
                class="btn btn-danger rounded-pill"
              >
                ⬇ Descargar
              </button>

              <button
                v-else
                class="btn btn-secondary rounded-pill"
                disabled
              >
                ❌ Descarga bloqueada
              </button>

              <!-- VER IMAGEN POR SLUG -->
              <NuxtLink
                :to="`/foto/${image.slug}`"
                class="btn btn-outline-dark rounded-pill"
              >
                👁 Ver Imagen
              </NuxtLink>

            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('/api/images')

    if (!res.ok) {
      const errorText = await res.text()
      console.error('ERROR API:', res.status, errorText)
      return
    }

    const data = await res.json()

    console.log('IMAGENES:', data)

    images.value = data

  } catch (error) {
    console.error('FETCH ERROR:', error)
  } finally {
    loading.value = false
  }
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const downloadImage = (image) => {
  try {
    const link = document.createElement('a')
    link.href = image.urlOriginal
    link.download = `${image.slug}.jpg`
    link.click()
  } catch (error) {
    console.error('Error descargando:', error)
  }
}
</script>