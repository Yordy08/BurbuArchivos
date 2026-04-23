<template>
  <div class="container py-5">

    <!-- HEADER -->
    <div class="text-center mb-5">
      <h1 class="fw-bold text-danger">
        🛡️ Panel Admin Pro
      </h1>
      <p class="text-muted">
        Gestión de usuarios y estadísticas del sistema
      </p>
    </div>

    <!-- ACCESO DENEGADO -->
    <div v-if="!isAdmin" class="alert alert-danger text-center">
      ❌ No tienes permisos para acceder a esta sección
    </div>

    <!-- PANEL ADMIN -->
    <div v-else>

      <!-- ESTADÍSTICAS -->
      <div class="row g-3 mb-5">

        <div class="col-md-4">
          <div class="card bg-primary text-white">
            <div class="card-body">
              <h5>Total Usuarios</h5>
              <h3>{{ users.length }}</h3>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card bg-success text-white">
            <div class="card-body">
              <h5>Total Imágenes</h5>
              <h3>{{ totalImages }}</h3>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card bg-dark text-white">
            <div class="card-body">
              <h5>Total Logins</h5>
              <h3>{{ totalLogins }}</h3>
            </div>
          </div>
        </div>

      </div>

      <!-- TABLA USUARIOS -->
      <div class="card shadow">
        <div class="card-header bg-danger text-white">
          👥 Gestión de Usuarios
        </div>

        <div class="card-body table-responsive">

          <table class="table table-hover align-middle">

            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Imágenes</th>
                <th>Logins</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="user in users" :key="user.id">

                <td>
                  <input v-model="user.name" class="form-control form-control-sm" />
                </td>

                <td>
                  <input v-model="user.email" class="form-control form-control-sm" />
                </td>

                <td>
                  <select v-model="user.role" class="form-select form-select-sm">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>

                <td class="text-center">
                  {{ user._count?.images || 0 }}
                </td>

                <td class="text-center">
                  {{ user.loginCount || 0 }}
                </td>

                <td>
                  <button
                    class="btn btn-sm btn-primary me-2"
                    @click="updateUser(user)"
                  >
                    Guardar
                  </button>

                  <button
                    class="btn btn-sm btn-warning"
                    @click="resetPassword(user)"
                  >
                    Reset Pass
                  </button>
                </td>

              </tr>
            </tbody>

          </table>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const isAdmin = ref(false)

const totalImages = ref(0)
const totalLogins = ref(0)

/* VERIFICAR ADMIN */
onMounted(async () => {
  await checkUser()

  if (isAdmin.value) {
    await loadUsers()
  }
})

const checkUser = async () => {
  try {
    const res = await fetch('/api/auth/me')

    if (!res.ok) {
      isAdmin.value = false
      return
    }

    const data = await res.json()

    console.log('ME RESPONSE:', data)

    // ✅ CORRECTO (seguro contra undefined)
    isAdmin.value = data?.user?.role === 'admin'

  } catch (err) {
    console.error('Error auth/me:', err)
    isAdmin.value = false
  }
}

/* CARGAR USUARIOS */
const loadUsers = async () => {
  try {
    const res = await fetch('/api/admin/users')
    const data = await res.json()

    users.value = data.users || []
    totalImages.value = data.totalImages || 0
    totalLogins.value = data.totalLogins || 0

  } catch (err) {
    console.error('Error loading users:', err)
  }
}

/* ACTUALIZAR USUARIO */
const updateUser = async (user) => {
  try {
    await fetch(`/api/admin/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        role: user.role
      })
    })
  } catch (err) {
    console.error('Error update user:', err)
  }
}

/* RESET PASSWORD */
const resetPassword = async (user) => {
  try {
    await fetch(`/api/admin/users/${user.id}/reset-password`, {
      method: 'POST'
    })

    alert('Contraseña reseteada')
  } catch (err) {
    console.error('Error reset password:', err)
  }
}
</script>