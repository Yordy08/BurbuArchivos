<template>
  <div class="container py-5">

    <!-- TITULO -->
    <div class="text-center mb-5">
      <h1 class="fw-bold text-danger display-4">
        🖼️ Galería de Imágenes
      </h1>
      <p class="text-muted">Explora, descarga y visualiza imágenes</p>
    </div>

    <!-- LOADING -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" style="width:4rem;height:4rem;">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- SIN IMAGENES -->
    <div v-else-if="images.length === 0" class="alert alert-warning text-center">
      No hay imágenes disponibles.
    </div>

    <!-- GALERIA -->
    <div v-else class="row g-4">

      <div
        v-for="image in images"
        :key="image.id"
        class="col-md-6 col-lg-4 col-xl-3"
      >
        <div class="card h-100 shadow border-0">

          <!-- IMAGEN -->
          <img
            :src="image.urlOriginal"
            :alt="image.title"
            class="card-img-top"
            style="height:220px; object-fit:cover;"
          />

          <!-- BODY -->
          <div class="card-body d-flex flex-column">

            <h5 class="card-title text-danger fw-bold">
              {{ image.title }}
            </h5>

            <p class="small text-muted mb-1">
              👤 {{ image.user.name }}
            </p>

            <p class="small text-muted">
              📅 {{ new Date(image.createdAt).toLocaleDateString() }}
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
    if (res.ok) {
      images.value = await res.json()
    }
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})

const downloadImage = (image) => {
  const link = document.createElement('a')
  link.href = image.urlOriginal
  link.download = `${image.slug}.jpg`
  link.click()
}
</script>