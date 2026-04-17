<template>
  <div class="card shadow-lg border-0">
    <div class="card-body p-5">
      <h2 class="card-title text-center mb-4 fw-bold text-primary">Iniciar Sesión</h2>

      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label fw-semibold">Correo electrónico</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-envelope"></i></span>
            <input
              id="email"
              v-model="email"
              type="email"
              class="form-control form-control-lg"
              required
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="form-label fw-semibold">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control form-control-lg"
              required
              placeholder="Tu contraseña"
            />
          </div>
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-primary btn-lg" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            {{ loading ? 'Iniciando...' : 'Iniciar Sesión' }}
          </button>
        </div>

        <div v-if="error" class="alert alert-danger d-flex align-items-center">
          <i class="bi bi-exclamation-triangle me-2"></i>
          <span>{{ error }}</span>
        </div>

        <div v-if="success" class="alert alert-success d-flex align-items-center">
          <i class="bi bi-check-circle me-2"></i>
          <span>{{ success }}</span>
        </div>
      </form>

      <hr class="my-4">

      <p class="text-center mb-0">
        ¿No tienes cuenta?
        <NuxtLink to="/register" class="text-decoration-none fw-semibold text-primary">
          Regístrate aquí
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const login = async () => {
  loading.value = true
  error.value = ''

  try {
    // Aquí iría la lógica de autenticación
    console.log('Login attempt:', { email: email.value, password: password.value })

    // Simulación de login exitoso
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Redirigir al dashboard o página principal
    await navigateTo('/')

  } catch (err) {
    error.value = 'Error al iniciar sesión. Verifica tus credenciales.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.card {
  max-width: 450px;
  width: 100%;
}

.input-group-text {
  background-color: #f8f9fa;
  border-color: #dee2e6;
}

.form-control:focus {
  border-color: #0d6efd;
  box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
}

.btn-primary {
  background: linear-gradient(135deg, #0d6efd 0%, #6610f2 100%);
  border: none;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn-primary:hover:not(:disabled) {
  background: linear-gradient(135deg, #0b5ed7 0%, #5c0fc8 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(13, 110, 253, 0.4);
}

.btn-primary:disabled {
  background: #6c757d;
  transform: none;
}

.alert {
  border: none;
  border-radius: 8px;
  font-weight: 500;
}

.spinner-border-sm {
  width: 1rem;
  height: 1rem;
}
</style>