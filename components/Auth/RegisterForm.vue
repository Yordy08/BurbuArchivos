<template>
  <div class="card shadow-lg border-0">
    <div class="card-body p-5">
      <h2 class="card-title text-center mb-4 fw-bold text-success">Crear Cuenta</h2>

      <form @submit.prevent="register">
        <div class="mb-3">
          <label for="name" class="form-label fw-semibold">Nombre completo</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-person"></i></span>
            <input
              id="name"
              v-model="name"
              type="text"
              class="form-control form-control-lg"
              required
              placeholder="Tu nombre completo"
            />
          </div>
        </div>

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

        <div class="mb-3">
          <label for="password" class="form-label fw-semibold">Contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock"></i></span>
            <input
              id="password"
              v-model="password"
              type="password"
              class="form-control form-control-lg"
              required
              placeholder="Tu contraseña (mín. 6 caracteres)"
              minlength="6"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="confirmPassword" class="form-label fw-semibold">Confirmar contraseña</label>
          <div class="input-group">
            <span class="input-group-text"><i class="bi bi-lock-fill"></i></span>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="form-control form-control-lg"
              required
              placeholder="Confirma tu contraseña"
              minlength="6"
            />
          </div>
        </div>

        <div class="d-grid mb-3">
          <button type="submit" class="btn btn-success btn-lg" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2" role="status"></span>
            {{ loading ? 'Creando cuenta...' : 'Crear Cuenta' }}
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
        ¿Ya tienes cuenta?
        <NuxtLink to="/login" class="text-decoration-none fw-semibold text-primary">
          Inicia sesión aquí
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const success = ref('')
const loading = ref(false)

const register = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  // Validación básica
  if (password.value !== confirmPassword.value) {
    error.value = 'Las contraseñas no coinciden'
    loading.value = false
    return
  }

  if (password.value.length < 6) {
    error.value = 'La contraseña debe tener al menos 6 caracteres'
    loading.value = false
    return
  }

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value
      })
    })

    const data = await response.json()

    if (data.ok) {
      success.value = 'Cuenta creada exitosamente. Redirigiendo...'
      setTimeout(() => {
        navigateTo('/login')
      }, 2000)
    } else {
      error.value = data.error || 'Error al crear la cuenta'
    }
  } catch (err) {
    error.value = 'Error de conexión. Inténtalo de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1f2937;
}

.form-group {
  margin-bottom: 1rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #374151;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-register {
  width: 100%;
  padding: 0.75rem;
  background: #10b981;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-register:hover:not(:disabled) {
  background: #059669;
}

.btn-register:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error {
  color: #dc2626;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.success {
  color: #059669;
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.login-link {
  text-align: center;
  margin-top: 1.5rem;
  color: #6b7280;
}

.login-link a {
  color: #3b82f6;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>