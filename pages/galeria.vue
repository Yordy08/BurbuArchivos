<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold text-danger d-flex align-items-center gap-2">
        📁 Álbumes por Título
      </h2>
      <p class="text-muted mb-0">{{ Object.keys(titleAlbums).length }} álbum(es)</p>
    </div>

    <!-- ALBUMS BY TITLE -->
    <div v-if="Object.keys(titleAlbums).length" class="row g-4">
        <div 
          v-for="(album, normalizedTitle) in titleAlbums"
          :key="normalizedTitle"
          class="col-lg-3 col-md-4 col-sm-6"
        >
<div 
          class="album-card h-100 cursor-pointer"
          @click="openAlbum(normalizedTitle)"
        >
          <div class="album-cover position-relative">
            <div class="folder-icon">
              📁
            </div>
            <img 
              :src="album.images[0]?.urlOriginal || '/placeholder-folder.jpg'" 
              alt="Portada"
              class="cover-img"
            />
          </div>
          <div class="album-body p-3">
          <h6 class="mb-2 text-truncate">{{ album.displayTitle }}</h6>
            <div class="d-flex justify-content-between align-items-center">
              <small class="text-muted">{{ album.images.length }} foto{{ album.images.length > 1 ? 's' : '' }}</small>
              <span class="badge bg-danger">Ver</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-5">
      <i class="fas fa-images fa-4x text-muted mb-3"></i>
      <h4 class="text-muted">No hay álbumes aún</h4>
      <p class="text-muted">Sé el primero en subir imágenes</p>
    </div>

    <!-- MODAL ALBUM -->
    <div v-if="selectedAlbum" class="modal-backdrop" @click.self="closeAlbum">
      <div class="modal-content">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h4 class="text-danger">
            📁 {{ selectedAlbum.title }}
          </h4>
          <button class="btn-close" @click="closeAlbum"></button>
        </div>

        <div class="row g-3">
          <div 
            v-for="img in selectedAlbum.images" 
            :key="img.id"
            class="col-lg-3 col-md-4 col-sm-6"
          >
            <div 
              class="img-card cursor-pointer"
              @click="openImage(img)"
            >
              <img :src="img.urlOriginal" class="card-img" />
              <div class="img-overlay">
                <i class="fas fa-expand"></i>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center mt-4">
          <button class="btn btn-secondary me-2" @click="closeAlbum">
            ← Cerrar álbum
          </button>
        </div>
      </div>
    </div>

    <!-- MODAL IMAGE -->
    <div v-if="selectedImage" class="modal-backdrop" @click.self="closeImage">
      <div class="modal-content image-modal">
        <div class="d-flex justify-content-between align-items-start mb-3">
          <h5 class="text-white">{{ selectedImage.title }}</h5>
          <button class="btn-close btn-close-white" @click="closeImage"></button>
        </div>
        <img :src="selectedImage.urlOriginal" class="img-full" />
        <div class="text-center mt-3">
          <button class="btn btn-danger me-2" @click="downloadImage(selectedImage)">
            ⬇ Descargar
          </button>
          <button class="btn btn-secondary" @click="closeImage">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { navigateTo } from '#app'

const images = ref([])
const selectedAlbum = ref(null)
const selectedImage = ref(null)

// Group by title
const titleAlbums = computed(() => {
  const group = {}
  images.value.forEach(img => {
    if (img.visibility === 'public' && img.title) {
      const normalizedTitle = img.title.toLowerCase().trim()
      if (!group[normalizedTitle]) {
        group[normalizedTitle] = {
          displayTitle: img.title,
          images: []
        }
      }
      group[normalizedTitle].images.push(img)
    }
  })
  return group
})

onMounted(async () => {
  try {
    const res = await $fetch('/api/images')
    images.value = res || []
  } catch (err) {
    console.error('Error loading images:', err)
  }
})

const openAlbum = (normalizedTitle) => {
  const album = titleAlbums.value[normalizedTitle]
  selectedAlbum.value = {
    title: album.displayTitle,
    images: album.images
  }
}

const closeAlbum = () => {
  selectedAlbum.value = null
}

const openImage = (img) => {
  selectedImage.value = img
}

const closeImage = () => {
  selectedImage.value = null
}

const downloadImage = async (img) => {
  try {
    // Increment download counter in database
    await $fetch('/api/images/download', {
      method: 'POST',
      body: { id: img.id }
    })

    // Fetch the image as a blob to force download
    const response = await fetch(img.urlOriginal)
    const blob = await response.blob()
    
    // Create download link with blob
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    // Use the original filename from URL or title
    const filename = img.title 
      ? `${img.title}.${img.urlOriginal.split('.').pop() || 'jpg'}`
      : `imagen.${img.urlOriginal.split('.').pop() || 'jpg'}`
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error downloading image:', err)
    // Fallback: open image URL directly
    window.open(img.urlOriginal, '_blank')
  }
}
</script>

<style scoped>
.album-card {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.15);
  border: 1px solid rgba(220, 53, 69, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
}

.album-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 35px rgba(220, 53, 69, 0.25);
}

.folder-icon {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 2;
  font-size: 24px;
  background: rgba(220, 53, 69, 0.9);
  color: white;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

.cover-img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.album-body h6 {
  color: #dc3545;
  font-weight: 700;
  margin-bottom: 8px;
}

.cursor-pointer {
  cursor: pointer;
}

/* MODAL */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-height: 90vh;
  overflow-y: auto;
  max-width: 95vw;
  width: 800px;
}

.image-modal {
  max-width: 90vw;
  width: 900px;
}

.img-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 150px;
  transition: transform 0.3s;
}

.img-card:hover {
  transform: scale(1.05);
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(220, 53, 69, 0.8);
  opacity: 0;
  transition: opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
}

.img-card:hover .img-overlay {
  opacity: 1;
}

.img-full {
  max-width: 100%;
  max-height: 70vh;
  width: auto;
  height: auto;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
}

.btn-close-white {
  filter: invert(1);
}

@media (max-width: 768px) {
  .modal-content {
    margin: 10px;
    width: calc(100vw - 20px);
  }
}
</style>
