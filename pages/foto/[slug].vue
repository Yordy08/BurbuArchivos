<template>
  <div class="container py-5">

    <!-- Loading -->
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-danger"></div>
    </div>

    <!-- Imagen -->
    <div v-else-if="image" class="row g-4">

      <div class="col-lg-8">
        <img
          :src="image.urlOriginal"
          :alt="image.title"
          class="img-fluid rounded shadow w-100"
        />
      </div>

      <div class="col-lg-4">
        <div class="card shadow border-0">
          <div class="card-body">

            <h3 class="text-danger fw-bold">
              {{ image.title }}
            </h3>

            <p>
              👤 {{ image.user?.name || 'Sin usuario' }}
            </p>

            <p>
              📅 {{ new Date(image.createdAt).toLocaleDateString() }}
            </p>

            <p>
              ⬇ {{ image.downloads }}
            </p>

            <button
              v-if="image.downloadable"
              class="btn btn-danger w-100"
              @click="downloadImage"
            >
              Descargar
            </button>

          </div>
        </div>
      </div>

    </div>

    <!-- No encontrada -->
    <div v-else class="alert alert-warning text-center">
      Imagen no encontrada
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

    console.log('SLUG QUE LLEGA:', slug)

    const res = await fetch(`/api/images/${slug}`, {
      credentials: 'include'
    })

    console.log('STATUS:', res.status)

    const data = await res.json().catch(() => null)

    console.log('DATA BACKEND:', data)

    if (!res.ok) throw new Error('No encontrada')

    image.value = data

  } catch (err) {
    console.error('ERROR FRONT:', err)
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
      method: 'POST',
      credentials: 'include'
    })

    image.value.downloads++
  } catch (e) {
    console.error(e)
  }
}
</script>