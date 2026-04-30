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
              Subiendo imágenes... ({{ uploadProgress }}%)
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
                <small v-if="uploadStatus[index]" class="d-block text-center mt-1" :class="uploadStatus[index].success ? 'text-success' : 'text-danger'">
                  {{ uploadStatus[index].message }}
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
const uploadProgress = ref(0)
const uploadStatus = ref({})

const totalSize = ref(0)
const heaviestIndex = ref(-1)
const MAX_TOTAL_MB = 100

const removeImage = (index) => {
  URL.revokeObjectURL(preview.value[index])
  
  files.value.splice(index, 1)
  preview.value.splice(index, 1)
  delete uploadStatus.value[index]
  
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

// Upload single file - CÓDIGO CORRECTO DEL USUARIO
const uploadToCloudinary = async (file) => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "burbu_upload")

  uploadStatus.value[files.value.indexOf(file)] = { message: 'Subiendo...', success: false }

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dnf00mh7g/image/upload",
    {
      method: "POST",
      body: formData
    }
  )

  if (!res.ok) {
    throw new Error(`Cloudinary error: ${res.status}`)
  }

  const data = await res.json()
  uploadStatus.value[files.value.indexOf(file)] = { message: '✅ Subido', success: true }
  uploadProgress.value = 100
  
  return data
}

const subirImagenes = async () => {
  if (!files.value.length) {
    return Swal.fire({
      icon: 'warning',
      title: 'Selecciona imágenes'
    })
  }
  if (totalSize.value >= MAX_TOTAL_MB) {
    return Swal.fire({
      icon: 'warning',
      title: '¡Límite excedido!',
      text: `Total ${totalSize.value}MB excede ${MAX_TOTAL_MB}MB`
    })
  }

  subiendo.value = true
  uploadStatus.value = {}
  uploadProgress.value = 0

  const uploadedUrls = []

  try {
    for (let i = 0; i < files.value.length; i++) {
      const file = files.value[i]
      uploadStatus.value[i] = { message: 'Preparando...', success: false }

      // 1. Upload directo a Cloudinary
      const cloudRes = await uploadToCloudinary(file)
      
      // 2. Guardar en DB
      const saveRes = await fetch('/api/images/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.value,
          cloudinaryUrl: cloudRes.secure_url,
          publicId: cloudRes.public_id,
          visibility: visibility.value,
          downloadable: downloadable.value,
          seoEnabled: seoEnabled.value
        })
      })

      if (!saveRes.ok) {
        const err = await saveRes.json()
        throw new Error(err.statusMessage || 'Error al guardar')
      }

      const savedImage = await saveRes.json()
      uploadedUrls.push(savedImage.image)
    }

    Swal.fire({
      icon: 'success',
      title: '¡ÉXITO!',
      text: `${uploadedUrls.length} imagen(es) subidas`,
      timer: 2000
    })

    // Reset
    title.value = ''
    files.value = []
    preview.value = []

  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.message
    })
    console.error(err)
  } finally {
    subiendo.value = false
  }
}
</script>

