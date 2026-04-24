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

    <!-- TABLA -->
    <div class="card shadow">
      <div class="card-header bg-danger text-white">
        <h5 class="mb-0">🖼️ Mis Imágenes</h5>
      </div>

      <div class="card-body">

        <div v-if="loading" class="text-center">
          <div class="spinner-border text-danger"></div>
        </div>

        <div v-else-if="images.length === 0" class="text-center text-muted">
          No tienes imágenes subidas.
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
                    style="height:50px;width:50px;object-fit:cover;border-radius:5px"
                  />
                </td>

                <td>{{ image.title }}</td>

                <td>
                  <span
                    :class="image.visibility === 'public'
                      ? 'badge bg-success'
                      : 'badge bg-warning'"
                  >
                    {{ image.visibility }}
                  </span>
                </td>

                <td><strong>{{ image.downloads }}</strong></td>

                <td>
                  <span
                    :class="image.downloadable
                      ? 'badge bg-success'
                      : 'badge bg-danger'"
                  >
                    {{ image.downloadable ? 'Sí' : 'No' }}
                  </span>
                </td>

                <td>
                  {{ new Date(image.createdAt).toLocaleDateString() }}
                </td>

                <td>
                  <button
                    class="btn btn-sm btn-outline-primary me-1"
                    @click="editImage(image)"
                  >
                    ✏️
                  </button>

                  <NuxtLink
                    :to="`/foto/${image.slug}`"
                    class="btn btn-sm btn-outline-secondary me-1"
                  >
                    👁️
                  </NuxtLink>

                  <button
                    class="btn btn-sm btn-outline-danger"
                    @click="deleteImage(image)"
                  >
                    🗑️
                  </button>
                </td>

              </tr>
            </tbody>

          </table>
        </div>

      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showEditModal"
      class="modal d-block"
      style="background:rgba(0,0,0,.5)"
      @click.self="closeModal"
    >
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5>Editar Imagen</h5>
            <button class="btn-close" @click="closeModal"></button>
          </div>

          <div class="modal-body">
            <input
              v-model="editingImage.title"
              class="form-control mb-3"
              placeholder="Título"
            />

            <select v-model="editingImage.visibility" class="form-select mb-3">
              <option value="public">Pública</option>
              <option value="private">Privada</option>
            </select>

            <div class="form-check">
              <input
                type="checkbox"
                v-model="editingImage.downloadable"
                class="form-check-input"
              />
              <label>Descargable</label>
            </div>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">
              Cancelar
            </button>

            <button
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

const images = ref([])
const loading = ref(true)
const showEditModal = ref(false)
const saving = ref(false)

const stats = ref({
  totalImages: 0,
  totalDownloads: 0,
  totalUsers: 1,
  lastLogin: null
})

const editingImage = ref({})

onMounted(async () => {
  await loadData()
})

/* 🔥 UN SOLO FETCH (más estable) */
const loadData = async () => {
  try {
    loading.value = true

    const [imagesRes, statsRes] = await Promise.all([
      fetch('/api/admin/images'),
      fetch('/api/admin/stats')
    ])

    images.value = await imagesRes.json()

    const statsData = await statsRes.json()
    stats.value = {
      totalImages: statsData.totalImages,
      totalDownloads: statsData.totalDownloads,
      totalUsers: statsData.totalUsers,
      lastLogin: statsData.lastLogin || null
    }

  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

/* EDIT */
const editImage = (img) => {
  editingImage.value = { ...img }
  showEditModal.value = true
}

const closeModal = () => {
  showEditModal.value = false
}

/* SAVE */
const saveChanges = async () => {
  try {
    saving.value = true

    const res = await fetch(`/api/images/${editingImage.value.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingImage.value)
    })

    if (!res.ok) throw new Error('Error al actualizar')

    Swal.fire('OK', 'Actualizado', 'success')

    closeModal()
    await loadData()

  } catch (err) {
    Swal.fire('Error', err.message, 'error')
  } finally {
    saving.value = false
  }
}

/* DELETE (YA FUNCIONA CON TU BACKEND) */
const deleteImage = async (image) => {
  const ok = await Swal.fire({
    icon: 'warning',
    title: 'Eliminar imagen?',
    showCancelButton: true,
    confirmButtonText: 'Sí'
  })

  if (!ok.isConfirmed) return

  try {
    const res = await fetch(`/api/images/${image.id}`, {
      method: 'DELETE'
    })

    if (!res.ok) throw new Error('Error eliminando')

    Swal.fire('Eliminado', 'Imagen borrada', 'success')

    await loadData()

  } catch (err) {
    Swal.fire('Error', err.message, 'error')
  }
}
</script>