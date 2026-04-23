<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow">
    <div class="container-fluid">

      <NuxtLink class="navbar-brand" to="/">
        BurbuArchivos
      </NuxtLink>

      <!-- 🔥 BOTÓN HAMBURGUESA -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- 🔥 CONTENIDO COLAPSABLE -->
      <div class="collapse navbar-collapse" id="navbarContent">

        <!-- IZQUIERDA -->
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <NuxtLink class="nav-link" to="/">Inicio</NuxtLink>
          </li>

          <li class="nav-item">
            <NuxtLink class="nav-link" to="/galeria">Galería</NuxtLink>
          </li>

          <li class="nav-item" v-if="isLoggedIn">
            <NuxtLink class="nav-link" to="/subir">
              Subir
            </NuxtLink>
          </li>
        </ul>

        <!-- DERECHA -->
        <ul class="navbar-nav mb-2 mb-lg-0">

          <li class="nav-item" v-if="!isLoggedIn">
            <NuxtLink class="nav-link" to="/login">
              Login
            </NuxtLink>
          </li>

          <li v-else class="nav-item dropdown">

            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              {{ user?.name || 'Usuario' }}
            </a>

            <ul class="dropdown-menu dropdown-menu-end">

              <li>
                <NuxtLink class="dropdown-item" to="/perfil">
                  Perfil
                </NuxtLink>
              </li>

              <li v-if="user?.role === 'admin'">
                <NuxtLink class="dropdown-item" to="/admin">
                  Admin
                </NuxtLink>
              </li>

              <li><hr class="dropdown-divider" /></li>

              <li>
                <a class="dropdown-item text-danger" href="#" @click="logout">
                  Cerrar sesión
                </a>
              </li>

            </ul>

          </li>

        </ul>

      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { navigateTo } from '#app'

const isLoggedIn = ref(false)
const user = ref(null)

/* 🔥 CARGAR USUARIO */
const loadUser = async () => {
  try {
    const res = await fetch('/api/auth/me', {
      credentials: 'include'
    })

    if (!res.ok) {
      user.value = null
      isLoggedIn.value = false
      return
    }

    const data = await res.json()

    user.value = data.user
    isLoggedIn.value = true

  } catch (err) {
    user.value = null
    isLoggedIn.value = false
  }
}

onMounted(() => {
  loadUser()
  window.addEventListener('auth-changed', loadUser)
})

/* 🔥 LOGOUT */
const logout = async () => {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include'
  })

  user.value = null
  isLoggedIn.value = false

  window.dispatchEvent(new Event('auth-changed'))

  await navigateTo('/login')
}
</script>