<template>
  <div class="container py-5">
    <h1 class="mb-4 text-center fw-bold text-danger">📊 Panel Administrativo</h1>

    <!-- Estadísticas -->
    <div class="row g-3 mb-5">
      <div class="col-md-3">
        <div class="card bg-primary text-white">
          <div class="card-body">
            <h5 class="card-title">Imágenes Subidas</h5>
            <p class="card-text fs-4">{{ stats.totalImages }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-success text-white">
          <div class="card-body">
            <h5 class="card-title">Total Descargas</h5>
            <p class="card-text fs-4">{{ stats.totalDownloads }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-info text-white">
          <div class="card-body">
            <h5 class="card-title">Usuarios</h5>
            <p class="card-text fs-4">{{ stats.totalUsers }}</p>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="card bg-warning text-dark">
          <div class="card-body">
            <h5 class="card-title">Último Login</h5>
            <p class="card-text small">
              {{ stats.lastLogin ? new Date(stats.lastLogin).toLocaleDateString() : 'N/A' }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla de Imágenes -->
    <div class="card shadow">
      <div class="card-header bg-danger text-white">
        <h5 class="mb-0">🖼️ Mis Imágenes</h5>
      </div>
      <div class="card-body">
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
        </div>

        <div v-else-if="images.length === 0" class="text-center text-muted">
          <p>No tienes imágenes subidas.</p>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover">
            <thead class="table-light">
              <tr>
                <th>Imagen</th>
                <th>Título</th>
                <th>Visibilidad</th>
                <th>Descargas</th>
                <th>Descargable</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="image in images" :key="image.id">
                <td>
                  <img
                    :src="image.urlOriginal"
                    :alt="image.title"
                    style="height: 50px; width: 50px; object-fit: cover; border-radius: 4px;"
                  />
                </td>
                <td>{{ image.title }}</td>
                <td>
                  <span :class="{ 'badge bg-success': image.visibility === 'public', 'badge bg-warning': image.visibility === 'private' }">
                    {{ image.visibility }}
                  </span>
                </td>
                <td><strong>{{ image.downloads }}</strong></td>
                <td>
                  <span :class="{ 'badge bg-success': image.downloadable, 'badge bg-danger': !image.downloadable }">
                    {{ image.downloadable ? 'Sí' : 'No' }}
                  </span>
                </td>
                <td>{{ new Date(image.createdAt).toLocaleDateString() }}</td>
                <td>
                  <button
                    @click="editImage(image)"
                    class="btn btn-sm btn-outline-primary me-2"
                  >
                    ✏️ Editar
                  </button>
                  <NuxtLink
                    :to="`/foto/${image.slug}`"
                    class="btn btn-sm btn-outline-secondary"
                  >
                    👁️ Ver
                  </NuxtLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal de Edición -->
    <div
      v-if="showEditModal"
      class="modal d-block"
      style="background-color: rgba(0, 0, 0, 0.5);"
      @click.self="closeModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Imagen</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label class="form-label">Título</label>
                <input
                  v-model="editingImage.title"
                  type="text"
                  class="form-control"
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Visibilidad</label>
                <select v-model="editingImage.visibility" class="form-select">
                  <option value="public">Pública</option>
                  <option value="private">Privada</option>
                </select>
              </div>

              <div class="mb-3 form-check">
                <input
                  v-model="editingImage.downloadable"
                  type="checkbox"
                  class="form-check-input"
                  id="downloadable"
                />
                <label class="form-check-label" for="downloadable">
                  Permitir descargas
                </label>
              </div>

              <div class="mb-3 form-check">
                <input
                  v-model="editingImage.seoEnabled"
                  type="checkbox"
                  class="form-check-input"
                  id="seoEnabled"
                />
                <label class="form-check-label" for="seoEnabled">
                  SEO Habilitado
                </label>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="closeModal"
            >
              Cancelar
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="saveChanges"
              :disabled="saving"
            >
              {{ saving ? 'Guardando...' : 'Guardar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const stats = ref({
  totalImages: 0,
  totalDownloads: 0,
  totalUsers: 0,
  lastLogin: null
})

const images = ref([])
const loading = ref(true)
const showEditModal = ref(false)
const saving = ref(false)

const editingImage = ref({
  id: '',
  title: '',
  visibility: 'public',
  downloadable: false,
  seoEnabled: true
})

onMounted(async () => {
  await loadStats()
  await loadImages()
})

/* SOLO DATOS DEL USUARIO LOGUEADO */
const loadStats = async () => {
  try {
    const res = await fetch('/api/auth/me')

    if (!res.ok) return

    const user = await res.json()

    const userImages = user.images || []

    stats.value = {
      totalImages: userImages.length,

      totalDownloads: userImages.reduce(
        (acc, img) => acc + (img.downloads || 0),
        0
      ),

      totalUsers: 1,

      lastLogin: user.lastLogin || null
    }

  } catch (err) {
    console.error('Error loading stats:', err)
  }
}

/* SOLO IMÁGENES DEL USUARIO */
const loadImages = async () => {
  try {
    loading.value = true

    const res = await fetch('/api/auth/me')

    if (!res.ok) return

    const user = await res.json()

    images.value = user.images || []

  } catch (err) {
    console.error('Error loading images:', err)
  } finally {
    loading.value = false
  }
}

const editImage = (image) => {
  editingImage.value = { ...image }
  showEditModal.value = true
}

const closeModal = () => {
  showEditModal.value = false
}

const saveChanges = async () => {
  try {
    saving.value = true

    const res = await fetch(`/api/images/${editingImage.value.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: editingImage.value.title,
        visibility: editingImage.value.visibility,
        downloadable: editingImage.value.downloadable,
        seoEnabled: editingImage.value.seoEnabled
      })
    })

    if (!res.ok) {
      throw new Error('Error al actualizar')
    }

    Swal.fire({
      icon: 'success',
      title: 'Imagen actualizada',
      timer: 1500,
      showConfirmButton: false
    })

    closeModal()
    await loadImages()
    await loadStats()

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message
    })
  } finally {
    saving.value = false
  }
}
</script>