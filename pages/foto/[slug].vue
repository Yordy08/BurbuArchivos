<template>
  <div class="container py-5">
    <div v-if="loading" class="text-center">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="image" class="row">
      <div class="col-lg-8">
        <img :src="image.urlOriginal" :alt="image.title" class="img-fluid rounded shadow-lg" />
      </div>
      <div class="col-lg-4">
        <h1 class="mb-3">{{ image.title }}</h1>
        <div class="card shadow">
          <div class="card-body">
            <p class="card-text">
              <strong>Subido por:</strong> {{ image.user.name }}
            </p>
            <p class="card-text">
              <strong>Fecha:</strong> {{ new Date(image.createdAt).toLocaleDateString() }}
            </p>
            <p class="card-text">
              <strong>Descargas:</strong> {{ image.downloads }}
            </p>
            <div class="d-grid gap-2 mt-3">
              <button v-if="image.downloadable" @click="downloadImage" class="btn btn-danger">
                ⬇️ Descargar
              </button>
              <button v-else class="btn btn-secondary disabled">
                ❌ Descarga no permitida
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning">
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
    if (res.ok) {
      image.value = await res.json()
    }
  } catch (err) {
    console.error('Error loading image:', err)
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

    // Incrementar contador de descargas
    await fetch(`/api/images/${image.value.id}/download`, { method: 'POST' })
  } catch (err) {
    console.error('Error downloading image:', err)
  }
}
</script>