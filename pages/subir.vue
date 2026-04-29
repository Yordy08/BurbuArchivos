<template>
  <div class="container py-5">
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-5">

        <h2 class="mb-4 fw-bold text-danger d-flex align-items-center gap-2">
          🖼️ Subir Imágenes
        </h2>

        <form @submit.prevent="subirImagenes" class="row g-4">

          <!-- Titulo -->
          <div class="col-md-12">
            <label class="form-label">📝 Título *</label>
            <input
              v-model="title"
              type="text"
              class="form-control form-control-lg"
              placeholder="Título de las imágenes"
              required
            />
          </div>

          <!-- Imagenes -->
          <div class="col-12">
            <label class="form-label">📷 Seleccionar Imágenes *</label>

            <input
              type="file"
              multiple
              accept="image/*"
              class="form-control"
              @change="seleccionarArchivos"
              required
            />

            <div v-if="subiendo" class="text-info mt-2">
              Subiendo imágenes...
            </div>
          </div>

          <!-- Preview -->
          <div
            v-if="preview.length"
            class="col-12"
          >
            <div class="row g-3" style="position: relative;">
              <div
                class="col-md-3 position-relative"
                v-for="(img,index) in preview"
                :key="index"
                :class="{ 'border-danger shadow border-3': index === heaviestIndex && totalSize >= MAX_TOTAL_MB }"
              >
                <img
                  :src="img"
                  class="img-fluid rounded border"
                  style="height:200px;width:100%;object-fit:cover"
                />
                <button
                  @click="removeImage(index)"
                  class="btn-close position-absolute top-0 end-0 m-1 bg-danger rounded-circle"
                  style="width: 25px; height: 25px;"
                  title="Eliminar imagen"
                ></button>
                <small v-if="index === heaviestIndex && totalSize >= MAX_TOTAL_MB" class="d-block text-danger fw-bold text-center">
                  ❌ {{ Math.round((files[index]?.size || 0) / (1024*1024)) }}MB - Eliminar
                </small>
              </div>
            </div>
          </div>

          <!-- Total Size Warning -->
          <div v-if="preview.length" class="col-12">
            <div class="alert" :class="totalSize >= MAX_TOTAL_MB ? 'alert-danger' : 'alert-info'">
              📊 Total: <strong>{{ totalSize }}MB</strong> 
              <span v-if="totalSize >= MAX_TOTAL_MB" class="badge bg-danger ms-2">¡EXCEDIDO! Elimina la roja</span>
              <span v-else class="badge bg-success ms-2">OK</span>
              (Máx {{ MAX_TOTAL_MB }}MB)
            </div>
          </div>

          <!-- Boton -->
          <div class="col-12 text-end">
            <button
              class="btn btn-danger px-4"
              :disabled="subiendo || (totalSize >= MAX_TOTAL_MB)"
            >
              {{ subiendo ? 'Subiendo...' : 'Guardar Imágenes' }}
            </button>
          </div>

        </form>

      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted } from 'vue'
import { navigateTo } from '#app'
import slugify from 'slugify'
import Swal from 'sweetalert2'

const user = ref(null)

const title = ref('')
const slug = ref('')
const visibility = ref('public')
const downloadable = ref(true)
const seoEnabled = ref(true)

const files = ref([])
const preview = ref([])
const subiendo = ref(false)

const totalSize = ref(0)
const heaviestIndex = ref(-1)
const MAX_TOTAL_MB = 50

const removeImage = (index) => {
  // Revoke URL to avoid memory leak
  URL.revokeObjectURL(preview.value[index])
  
  files.value.splice(index, 1)
  preview.value.splice(index, 1)
  
  // Recalcular
  seleccionarArchivos({ target: { files: files.value } })
}

watch(title, (val) => {
  slug.value = slugify(val, {
    lower: true,
    strict: true
  })
})

onMounted(async () => {
  try {
    const res = await fetch('/api/auth/me')

    if (!res.ok) throw new Error()

    const data = await res.json()
    user.value = data.user

  } catch (err) {
    return navigateTo('/login')
  }
})

const seleccionarArchivos = (e) => {
  files.value = Array.from(e.target.files)

  preview.value = files.value.map(file =>
    URL.createObjectURL(file)
  )

  // Calcular total size y heaviest
  let sumSize = 0
  let heaviestIdx = -1
  let maxSize = 0
  files.value.forEach((file, idx) => {
    const sizeMB = file.size / (1024 * 1024)
    sumSize += sizeMB
    if (sizeMB > maxSize) {
      maxSize = sizeMB
      heaviestIdx = idx
    }
  })
  totalSize.value = sumSize.toFixed(1)
  heaviestIndex.value = heaviestIdx
}


const subirImagenes = async () => {
  if (!files.value.length) {
    return Swal.fire({
      icon: 'warning',
      title: 'Selecciona imágenes'
    })
  }
  if (totalSize >= MAX_TOTAL_MB) {
    return Swal.fire({
      icon: 'warning',
      title: '¡Límite excedido!',
      text: `Total ${totalSize}MB excede ${MAX_TOTAL_MB}MB. Elimina la imagen marcada en rojo.`
    })
  }

  subiendo.value = true

  const formData = new FormData()

  files.value.forEach(file => {
    formData.append('images', file)
  })

  formData.append('title', title.value)
  formData.append('slug', slug.value)
  formData.append('visibility', visibility.value)
  formData.append('downloadable', downloadable.value.toString())
  formData.append('seoEnabled', seoEnabled.value.toString())

  try {
    const res = await fetch('/api/images/upload', {
      method: 'POST',
      body: formData
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.statusMessage || 'Error al subir')
    }

    Swal.fire({
      icon: 'success',
      title: 'Imágenes guardadas',
      text: `${data.total} imagen(es) subida(s)`,
      timer: 2000,
      showConfirmButton: false
    })

    title.value = ''
    slug.value = ''
    files.value = []
    preview.value = []

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message
    })
  } finally {
    subiendo.value = false
  }
}
</script>