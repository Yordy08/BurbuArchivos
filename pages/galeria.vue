<template>
  <div class="container py-4">
<p class="text-muted">
          Explora imágenes compartidas por la comunidad
        </p>
    <!-- ALBUMS -->
    <div class="row g-4">

      <div
        v-for="album in albums"
        :key="album.userId"
        class="col-6 col-md-3"
      >
      

        <div class="album-card" @click="openAlbum(album)">

          <div class="album-cover">
            <img
              :src="album.cover"
              alt="album"
            />
          </div>

          <div class="album-info">
            <h6> Álbum de: {{ album.userName }}</h6>
            <small>{{ album.images.length }} fotos</small>
          </div>

        </div>

      </div>

    </div>

    <!-- MODAL ALBUM -->
    <div v-if="selectedAlbum" class="modal-backdrop" @click="closeAlbum">

      <div class="modal-content" @click.stop>

        <h4 class="mb-3 text-danger">
          📁 {{ selectedAlbum.userName }}
        </h4>

        <div class="row g-2">

          <div
            v-for="img in selectedAlbum.images"
            :key="img.id"
            class="col-6"
          >
            <img
              :src="img.urlOriginal"
              class="img-fluid rounded pointer"
              @click="openImage(img)"
            />
          </div>

        </div>

        <button class="btn btn-secondary w-100 mt-3" @click="closeAlbum">
          Cerrar
        </button>

      </div>

    </div>

    <!-- MODAL IMAGEN -->
    <div v-if="selectedImage" class="modal-backdrop" @click="closeImage">

      <div class="modal-content" @click.stop>

        <img :src="selectedImage.urlOriginal" class="img-fluid rounded"/>

        <h5 class="mt-2">{{ selectedImage.title }}</h5>

        <button class="btn btn-danger w-100 mt-2" @click="downloadImage">
          ⬇ Descargar
        </button>

        <button class="btn btn-secondary w-100 mt-2" @click="closeImage">
          Cerrar
        </button>

      </div>

    </div>

  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'

const images = ref([])
const albums = ref([])

const selectedAlbum = ref(null)
const selectedImage = ref(null)

onMounted(async () => {
  const res = await fetch('/api/images', {
    credentials: 'include'
  })

  const data = await res.json()

  images.value = Array.isArray(data) ? data : []

  console.log('IMÁGENES:', images.value)

  groupByUser()
})

/* 🔥 ALBUM POR USUARIO (ULTRA SEGURO) */
const groupByUser = () => {
  const map = {}

  images.value.forEach(img => {

    // 🔥 VALIDACIÓN COMPLETA
    if (!img || !img.user || !img.user.id) return

    const userId = img.user.id
    const userName = img.user.name || 'Usuario'

    if (!map[userId]) {
      map[userId] = {
        userId,
        userName,
        images: [],
        cover: img.urlOriginal || '/placeholder.jpg'
      }
    }

    map[userId].images.push(img)

    // 🔥 si quieres portada más real
    if (!map[userId].cover) {
      map[userId].cover = img.urlOriginal
    }
  })

  albums.value = Object.values(map)

  console.log('ALBUMS FINAL:', albums.value)
}

/* ALBUM */
const openAlbum = (album) => {
  selectedAlbum.value = album
}

const closeAlbum = () => {
  selectedAlbum.value = null
}

/* IMAGE */
const openImage = (img) => {
  selectedImage.value = img
}

const closeImage = () => {
  selectedImage.value = null
}

/* DOWNLOAD */
const downloadImage = () => {
  const link = document.createElement('a')
  link.href = selectedImage.value.urlOriginal
  link.download = selectedImage.value.title || 'imagen.jpg'
  link.click()
}
</script>
<style scoped>
.album-card {
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.album-card:hover {
  transform: translateY(-5px);
}

.album-cover img {
  width: 100%;
  height: 140px;
  object-fit: cover;
}

.album-info {
  padding: 10px;
  text-align: center;
}

.pointer {
  cursor: pointer;
}

/* MODAL */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 14px;
  width: 90%;
  max-width: 600px;
  text-align: center;
}
</style>