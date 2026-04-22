<template>
  <div class="container py-5">
    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-5">

        <h2 class="mb-4 fw-bold text-danger d-flex align-items-center gap-2">
          🖼️ Subir Imágenes
        </h2>

        <form @submit.prevent="subirImagenes" class="row g-4">

          <!-- Titulo -->
          <div class="col-md-6">
            <label class="form-label">📝 Título</label>
            <input
              v-model="title"
              type="text"
              class="form-control"
              placeholder="Título general"
              required
            />
          </div>

          <!-- Slug -->
          <div class="col-md-6">
            <label class="form-label">🔗 Slug SEO</label>
            <input
              v-model="slug"
              type="text"
              class="form-control"
              readonly
            />
          </div>

          <!-- Visibilidad -->
          <div class="col-md-6">
            <label class="form-label">🌍 Visibilidad</label>
            <select v-model="visibility" class="form-select">
              <option value="public">Público</option>
              <option value="private">Privado</option>
            </select>
          </div>

          <!-- Descarga -->
          <div class="col-md-3">
            <label class="form-label">⬇️ Descarga</label>
            <select v-model="downloadable" class="form-select">
              <option :value="true">Permitida</option>
              <option :value="false">Bloqueada</option>
            </select>
          </div>

          <!-- SEO -->
          <div class="col-md-3">
            <label class="form-label">🚀 SEO</label>
            <select v-model="seoEnabled" class="form-select">
              <option :value="true">Activo</option>
              <option :value="false">Apagado</option>
            </select>
          </div>

          <!-- Imagenes -->
          <div class="col-12">
            <label class="form-label">📷 Seleccionar Imágenes</label>

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
            <div class="row g-3">
              <div
                class="col-md-3"
                v-for="(img,index) in preview"
                :key="index"
              >
                <img
                  :src="img"
                  class="img-fluid rounded border"
                  style="height:200px;width:100%;object-fit:cover"
                />
              </div>
            </div>
          </div>

          <!-- Boton -->
          <div class="col-12 text-end">
            <button
              class="btn btn-danger px-4"
              :disabled="subiendo"
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
const downloadable = ref(false)
const seoEnabled = ref(true)

const files = ref([])
const preview = ref([])
const subiendo = ref(false)

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
}

const subirImagenes = async () => {
  if (!files.value.length) {
    return Swal.fire({
      icon: 'warning',
      title: 'Selecciona imágenes'
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