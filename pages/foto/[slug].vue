<template>
  <div class="container py-5">

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Imagen encontrada -->
    <div v-else-if="image" class="row g-4">

      <!-- Imagen -->
      <div class="col-lg-8">
        <img
          :src="image.urlOriginal"
          :alt="image.title"
          class="img-fluid rounded shadow-lg w-100"
        />
      </div>

      <!-- Información -->
      <div class="col-lg-4">
        <div class="card shadow border-0 h-100">
          <div class="card-body">

            <h1 class="fw-bold text-danger mb-3">
              {{ image.title }}
            </h1>

            <p class="mb-2">
              <strong>👤 Subido por:</strong>
              {{ image.user?.name || 'Usuario' }}
            </p>

            <p class="mb-2">
              <strong>📅 Fecha:</strong>
              {{ new Date(image.createdAt).toLocaleDateString() }}
            </p>

            <p class="mb-2">
              <strong>⬇ Descargas:</strong>
              {{ image.downloads }}
            </p>

            <p class="mb-4">
              <strong>🌍 Visibilidad:</strong>
              {{ image.visibility }}
            </p>

            <div class="d-grid gap-2">

              <button
                v-if="image.downloadable"
                @click="downloadImage"
                class="btn btn-danger"
              >
                ⬇ Descargar Imagen
              </button>

              <button
                v-else
                class="btn btn-secondary"
                disabled
              >
                ❌ Descarga bloqueada
              </button>

              <NuxtLink
                to="/galeria"
                class="btn btn-outline-dark"
              >
                ← Volver a Galería
              </NuxtLink>

            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- No encontrada -->
    <div v-else class="alert alert-warning text-center">
      📸 Imagen no encontrada.
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const image = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const slug = route.params.slug

    const res = await fetch(`/api/images/${slug}`)

    if (!res.ok) {
      throw new Error('Imagen no encontrada')
    }

    image.value = await res.json()

  } catch (error) {
    console.error('Error cargando imagen:', error)
    image.value = null
  } finally {
    loading.value = false
  }
})

const downloadImage = async () => {
  try {
    const link = document.createElement('a')
    link.href = image.value.urlOriginal
    link.download = `${image.value.slug}.jpg`
    link.click()

    await fetch(`/api/images/${image.value.id}/download`, {
      method: 'POST'
    })

    image.value.downloads++

  } catch (error) {
    console.error('Error descargando imagen:', error)
  }
}
</script>