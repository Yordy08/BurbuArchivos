<template>
  <div>
    <h1>{{ image?.title }}</h1>
    <img v-if="image" :src="image.urlOriginal" :alt="image.title" />
    <p v-else>Imagen no encontrada.</p>
  </div>
</template>

<script setup>
const { $prisma } = useNuxtApp()
const route = useRoute()

const slug = route.params.slug

let image = null
try {
  image = await $prisma.image.findUnique({
    where: { slug },
    include: { user: true }  // Opcional: incluye datos del usuario
  })
} catch (error) {
  console.error('Error al cargar imagen:', error)
  // Maneja el error, e.g., redirige o muestra mensaje
}
</script>