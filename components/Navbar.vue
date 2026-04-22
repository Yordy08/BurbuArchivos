<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container-fluid">
      <NuxtLink class="navbar-brand fw-bold d-flex align-items-center" to="/">
        <i class="bi bi-camera me-2"></i>
        BurbuArchivos
      </NuxtLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/" exact>
              <i class="bi bi-house me-1"></i>
              Inicio
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/galeria">
              <i class="bi bi-images me-1"></i>
              Galería
            </NuxtLink>
          </li>
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/subir">
              <i class="bi bi-cloud-upload me-1"></i>
              Subir Imagen
            </NuxtLink>
          </li>
        </ul>

        <ul class="navbar-nav">
          <li v-if="!isLoggedIn" class="nav-item">
            <NuxtLink class="nav-link" to="/login">
              <i class="bi bi-box-arrow-in-right me-1"></i>
              Iniciar Sesión
            </NuxtLink>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <NuxtLink class="nav-link" to="/register">
              <i class="bi bi-person-plus me-1"></i>
              Registrarse
            </NuxtLink>
          </li>
          <li v-if="isLoggedIn" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle d-flex align-items-center"
              href="#"
              id="userDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle me-2"></i>
              {{ user?.name || 'Usuario' }}
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li>
                <NuxtLink class="dropdown-item" to="/perfil">
                  <i class="bi bi-person me-2"></i>
                  Mi Perfil
                </NuxtLink>
              </li>
              <li v-if="user?.role === 'admin'">
                <NuxtLink class="dropdown-item" to="/admin">
                  <i class="bi bi-gear me-2"></i>
                  Panel Admin
                </NuxtLink>
              </li>
              <li><hr class="dropdown-divider"></li>
              <li>
                <a class="dropdown-item text-danger" href="#" @click="logout">
                  <i class="bi bi-box-arrow-right me-2"></i>
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'

const isLoggedIn = ref(false)
const user = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('/api/auth/me')
    if (res.ok) {
      const data = await res.json()
      user.value = data.user
      isLoggedIn.value = true
    }
  } catch (err) {
    isLoggedIn.value = false
    user.value = null
  }
})

const logout = async (e) => {
  e.preventDefault()
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
    isLoggedIn.value = false
    user.value = null
    await navigateTo('/login')
  } catch (err) {
    // Error handled silently
  }
}
</script>

<style scoped>
.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: rgba(255, 255, 255, 0.8) !important;
}

.dropdown-item:hover {
  background-color: #f8f9fa;
}
</style>