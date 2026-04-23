<template>
  <div class="container py-5">

    <!-- Cargando -->
    <div v-if="pending" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <!-- Perfil -->
    <div v-else-if="user" class="row g-4">

      <!-- Tarjeta Usuario -->
      <div class="col-lg-4">
        <div class="card shadow border-0 rounded-4 h-100">
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

            <p class="text-muted mb-3">
              {{ user.email }}
            </p>

            <span class="badge bg-dark px-3 py-2 rounded-pill">
              {{ user.role }}
            </span>

            <hr>

            <div class="row text-center">

              <div class="col-6">
                <h4 class="fw-bold text-danger">
                  {{ user.images?.length || 0 }}
                </h4>
                <small class="text-muted">
                  Imágenes
                </small>
              </div>

              <div class="col-6">
                <h4 class="fw-bold text-danger">
                  {{ totalDownloads }}
                </h4>
                <small class="text-muted">
                  Descargas
                </small>
              </div>

            </div>

          </div>
        </div>
      </div>

      <!-- Galería -->
      <div class="col-lg-8">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold text-danger mb-0">
            🖼️ Mis Imágenes
          </h3>

          <NuxtLink
            to="/subir"
            class="btn btn-danger rounded-pill px-4"
          >
            + Subir Nueva
          </NuxtLink>
        </div>

        <div
          v-if="user.images?.length"
          class="row g-4"
        >

          <div
            v-for="image in user.images"
            :key="image.id"
            class="col-md-6"
          >
            <div class="card shadow border-0 h-100">

              <img
                :src="image.urlOriginal"
                :alt="image.title"
                class="card-img-top"
                style="height:220px;object-fit:cover;"
              />

              <div class="card-body">

                <h5 class="fw-bold text-danger">
                  {{ image.title }}
                </h5>

                <p class="small text-muted mb-2">
                  📅 {{ formatDate(image.createdAt) }}
                </p>

                <p class="small text-muted mb-3">
                  ⬇ {{ image.downloads }} descargas
                </p>

                <NuxtLink
                  :to="`/foto/${image.slug}`"
                  class="btn btn-outline-dark rounded-pill w-100"
                >
                  👁 Ver Imagen
                </NuxtLink>

              </div>

            </div>
          </div>

        </div>

        <div
          v-else
          class="alert alert-warning text-center"
        >
          No has subido imágenes todavía.
        </div>

      </div>

    </div>

    <!-- No encontrado -->
    <div v-else class="alert alert-danger text-center">
      Usuario no encontrado o sesión expirada.
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const {
  data: user,
  pending
} = await useFetch('/api/auth/me')

const initials = computed(() => {
  if (!user.value?.name) return 'U'

  return user.value.name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
})

const totalDownloads = computed(() => {
  if (!user.value?.images) return 0

  return user.value.images.reduce(
    (total, img) => total + (img.downloads || 0),
    0
  )
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
</script>