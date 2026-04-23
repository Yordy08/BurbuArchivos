<template>
  <div class="container-fluid min-vh-100 bg-light">

    <!-- TÍTULO + BUSCADOR -->
    <section class="py-4 bg-white">

      <div class="container text-center mb-4">

        <p class="text-muted">
          Explora imágenes compartidas por la comunidad
        </p>

        <!-- 🔥 BUSCADOR -->
        <div class="row justify-content-center">
          <div class="col-md-6">

            <input
              v-model="search"
              type="text"
              class="form-control form-control-lg"
              placeholder="🔍 Buscar por título o usuario..."
            />

          </div>
        </div>

      </div>

      <!-- LOADING -->
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-danger"></div>
      </div>

      <!-- EMPTY -->
      <div v-else-if="filteredImages.length === 0" class="alert alert-warning text-center">
        No hay imágenes encontradas.
      </div>

      <!-- GRID -->
      <div v-else class="container">
        <div class="row g-4">

          <div
            v-for="image in filteredImages"
            :key="image.id"
            class="col-md-6 col-lg-4 col-xl-3"
          >

            <div class="card shadow border-0 h-100 hover-card">

              <img
                :src="image.urlOriginal"
                class="card-img-top"
                style="height:220px;object-fit:cover;cursor:pointer;"
                @click="openModal(image)"
              />

              <div class="card-body d-flex flex-column">

                <h5 class="fw-bold text-danger">
                  {{ image.title }}
                </h5>

                <p class="small text-muted">
                  Publicado por: {{ image.user?.name || 'Usuario' }}
                </p>

                <p class="small text-muted mb-2">
                  ⬇ {{ image.downloads }} descargas
                </p>

                <div class="mt-auto d-grid gap-2">

                  <button
                    class="btn btn-outline-dark rounded-pill"
                    @click="openModal(image)"
                  >
                    👁 Ver Imagen
                  </button>

                  <button
                    v-if="image.downloadable"
                    class="btn btn-danger rounded-pill"
                    @click="downloadImage(image)"
                  >
                    ⬇ Descargar
                  </button>

                  <button
                    v-else
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

    <!-- MODAL -->
    <transition name="fade">
      <div v-if="selectedImage" class="modal-backdrop" @click="closeModal">

        <div class="modal-box" @click.stop>

          <img :src="selectedImage.urlOriginal" />

          <h5 class="mt-3 text-danger">
            {{ selectedImage.title }}
          </h5>

          <p class="text-muted">
            👤 {{ selectedImage.user?.name }}
          </p>

          <button
            v-if="selectedImage.downloadable"
            class="btn btn-danger w-100"
            @click="downloadImage(selectedImage)"
          >
            ⬇ Descargar
          </button>

          <button class="btn btn-secondary w-100 mt-2" @click="closeModal">
            Cerrar
          </button>

        </div>

      </div>
    </transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const images = ref([])
const loading = ref(true)
const selectedImage = ref(null)
const search = ref('')

onMounted(async () => {
  await loadImages()
})

const loadImages = async () => {
  try {
    loading.value = true
    const res = await fetch('/api/images')
    images.value = await res.json()
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

/* 🔥 FILTRO BUSCADOR */
const filteredImages = computed(() => {
  if (!search.value) return images.value

  const s = search.value.toLowerCase()

  return images.value.filter(img =>
    img.title?.toLowerCase().includes(s) ||
    img.user?.name?.toLowerCase().includes(s)
  )
})

const openModal = (img) => {
  selectedImage.value = img
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedImage.value = null
  document.body.style.overflow = 'auto'
}

const downloadImage = async (image) => {
  try {
    await fetch('/api/images/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: image.id })
    })

    const link = document.createElement('a')
    link.href = image.urlOriginal.replace('/upload/', '/upload/fl_attachment/')
    link.click()

  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.hover-card {
  transition: 0.3s;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.15);
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-box {
  background: white;
  padding: 15px;
  border-radius: 14px;
  max-width: 600px;
  width: 90%;
  text-align: center;
}

.modal-box img {
  width: 100%;
  border-radius: 12px;
}
</style>