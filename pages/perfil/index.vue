<template>
  <div class="container py-5">

    <!-- Cargando -->
    <div v-if="pending" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Perfil -->
    <div v-else-if="user" class="row g-5">

      <!-- IZQUIERDA -->
      <div class="col-lg-4 d-flex flex-column gap-4">

        <!-- CARD PERFIL -->
        <div class="card shadow border-0 rounded-4">
          <div class="card-body text-center p-4">

            <div
              class="rounded-circle bg-danger text-white d-flex align-items-center justify-content-center mx-auto mb-3"
              style="width:90px;height:90px;font-size:2rem;font-weight:bold;"
            >
              {{ initials }}
            </div>

            <h2 class="fw-bold text-danger mb-1">
              {{ user.name }}
            </h2>

            <p class="text-muted mb-2">
              {{ user.email }}
            </p>

            <span class="badge bg-dark px-3 py-2 rounded-pill mb-3">
              {{ user.role }}
            </span>

            <hr>

            <div class="row text-center">
              <div class="col-6">
                <h4 class="fw-bold text-danger">
                  {{ user.images?.length || 0 }}
                </h4>
                <small class="text-muted">Imágenes</small>
              </div>

              <div class="col-6">
                <h4 class="fw-bold text-danger">
                  {{ totalDownloads }}
                </h4>
                <small class="text-muted">Descargas</small>
              </div>
            </div>

          </div>
        </div>

      </div>

      <!-- DERECHA -->
      <div class="col-lg-8">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold text-danger mb-0">🖼️ Mis Imágenes</h3>

          <NuxtLink to="/subir" class="btn btn-danger rounded-pill px-4">
            + Subir Nueva
          </NuxtLink>
        </div>

        <!-- GALERÍA -->
        <div v-if="user.images?.length" class="row g-4">

          <div
            v-for="image in user.images"
            :key="image.id"
            class="col-md-6 col-xl-4"
          >
            <div class="card shadow border-0 h-100">

              <img
                :src="image.urlOriginal"
                class="card-img-top"
                style="height:200px;object-fit:cover;"
              />

              <div class="card-body">

                <h6 class="fw-bold text-danger">
                  {{ image.title }}
                </h6>

                <small class="text-muted d-block mb-2">
                  📅 {{ formatDate(image.createdAt) }}
                </small>

                <small class="text-muted d-block mb-3">
                  ⬇ {{ image.downloads }} descargas
                </small>

                <!-- BOTÓN VER (MODAL) -->
                <button
                  class="btn btn-outline-dark btn-sm w-100 rounded-pill"
                  @click="openModal(image)"
                >
                  Ver
                </button>

              </div>

            </div>
          </div>

        </div>

        <div v-else class="alert alert-warning text-center">
          No has subido imágenes todavía.
        </div>

      </div>

    </div>

    <!-- NO USER -->
    <div v-else class="alert alert-danger text-center">
      Usuario no encontrado o sesión expirada.
    </div>

    <!-- 🔥 MODAL -->
    <div
      v-if="showModal"
      class="modal fade show d-block"
      style="background: rgba(0,0,0,0.7);"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">

          <!-- HEADER -->
          <div class="modal-header">
            <h5 class="modal-title text-danger">
              {{ selectedImage?.title }}
            </h5>

            <button class="btn-close" @click="closeModal"></button>
          </div>

          <!-- BODY -->
          <div class="modal-body text-center">

            <img
              :src="selectedImage?.urlOriginal"
              class="img-fluid rounded"
              style="max-height:70vh;object-fit:contain;"
            />

            <p class="mt-3 text-muted">
              📅 {{ formatDate(selectedImage?.createdAt) }} |
              ⬇ {{ selectedImage?.downloads }} descargas
            </p>

          </div>

          <!-- FOOTER -->
          <div class="modal-footer">
            <button class="btn btn-dark" @click="closeModal">
              Cerrar
            </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const { data, pending, refresh } = await useFetch('/api/auth/me')

const user = computed(() => data.value?.user || null)

const initials = computed(() => {
  if (!user.value?.name) return 'U'
  return user.value.name
    .split(' ')
    .map(w => w[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const totalDownloads = computed(() => {
  if (!user.value?.images) return 0
  return user.value.images.reduce((t, i) => t + (i.downloads || 0), 0)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

/* 🔥 MODAL */
const selectedImage = ref(null)
const showModal = ref(false)

const openModal = (image) => {
  selectedImage.value = image
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  selectedImage.value = null
}
</script>