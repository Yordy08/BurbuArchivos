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

      <!-- Columna izquierda -->
      <div class="col-lg-4 d-flex flex-column gap-4">

        <!-- Perfil card -->
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

        <!-- Editar perfil -->
        <div class="card shadow border-0 rounded-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-danger mb-3">✏️ Editar Perfil</h5>

            <div v-if="profileMessage" :class="['alert', profileError ? 'alert-danger' : 'alert-success']">
              {{ profileMessage }}
            </div>

            <form @submit.prevent="updateProfile" class="d-flex flex-column gap-3">

              <input v-model="profileForm.name" type="text" class="form-control" placeholder="Nombre" required />

              <input v-model="profileForm.email" type="email" class="form-control" placeholder="Correo" required />

              <button type="submit" class="btn btn-danger rounded-pill" :disabled="profileLoading">
                <span v-if="profileLoading" class="spinner-border spinner-border-sm me-2"></span>
                Guardar Cambios
              </button>

            </form>
          </div>
        </div>

        <!-- Cambiar contraseña -->
        <div class="card shadow border-0 rounded-4">
          <div class="card-body p-4">
            <h5 class="fw-bold text-danger mb-3">🔒 Contraseña</h5>

            <div v-if="passwordMessage" :class="['alert', passwordError ? 'alert-danger' : 'alert-success']">
              {{ passwordMessage }}
            </div>

            <form @submit.prevent="updatePassword" class="d-flex flex-column gap-3">

              <input v-model="passwordForm.currentPassword" type="password" class="form-control" placeholder="Actual" required />

              <input v-model="passwordForm.newPassword" type="password" class="form-control" placeholder="Nueva" required />

              <input v-model="passwordForm.confirmPassword" type="password" class="form-control" placeholder="Confirmar" required />

              <button type="submit" class="btn btn-dark rounded-pill" :disabled="passwordLoading">
                <span v-if="passwordLoading" class="spinner-border spinner-border-sm me-2"></span>
                Actualizar
              </button>

            </form>
          </div>
        </div>

      </div>

      <!-- Columna derecha -->
      <div class="col-lg-8">

        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold text-danger mb-0">🖼️ Mis Imágenes</h3>

          <NuxtLink to="/subir" class="btn btn-danger rounded-pill px-4">
            + Subir Nueva
          </NuxtLink>
        </div>

        <!-- Galería -->
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

                <NuxtLink
                  :to="`/foto/${image.slug}`"
                  class="btn btn-outline-dark btn-sm w-100 rounded-pill"
                >
                  Ver
                </NuxtLink>

              </div>

            </div>
          </div>

        </div>

        <div v-else class="alert alert-warning text-center">
          No has subido imágenes todavía.
        </div>

      </div>

    </div>

    <!-- No user -->
    <div v-else class="alert alert-danger text-center">
      Usuario no encontrado o sesión expirada.
    </div>

  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const {
  data,
  pending,
  refresh
} = await useFetch('/api/auth/me')

const user = computed(() => data.value?.user || null)

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

// --- Editar Perfil ---
const profileForm = reactive({
  name: '',
  email: ''
})

const profileLoading = ref(false)
const profileMessage = ref('')
const profileError = ref(false)

watch(() => user.value, (u) => {
  if (u) {
    profileForm.name = u.name || ''
    profileForm.email = u.email || ''
  }
}, { immediate: true })

const updateProfile = async () => {
  profileLoading.value = true
  profileMessage.value = ''
  profileError.value = false

  try {
    const res = await $fetch('/api/users/me', {
      method: 'PUT',
      body: {
        name: profileForm.name,
        email: profileForm.email
      }
    })

    if (res.success) {
      profileMessage.value = 'Perfil actualizado correctamente'
      await refresh()
    }
  } catch (err) {
    profileError.value = true
    profileMessage.value = err?.data?.statusMessage || 'Error al actualizar el perfil'
  } finally {
    profileLoading.value = false
  }
}

// --- Cambiar Contraseña ---
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordLoading = ref(false)
const passwordMessage = ref('')
const passwordError = ref(false)

const updatePassword = async () => {
  passwordLoading.value = true
  passwordMessage.value = ''
  passwordError.value = false

  try {
    const res = await $fetch('/api/users/me/password', {
      method: 'PUT',
      body: {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword
      }
    })

    if (res.success) {
      passwordMessage.value = res.message
      passwordForm.currentPassword = ''
      passwordForm.newPassword = ''
      passwordForm.confirmPassword = ''
    }
  } catch (err) {
    passwordError.value = true
    passwordMessage.value = err?.data?.statusMessage || 'Error al cambiar la contraseña'
  } finally {
    passwordLoading.value = false
  }
}
</script>

