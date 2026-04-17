<template>
  <div>
    <h1>Perfil de Usuario</h1>
    <div v-if="user">
      <p>Nombre: {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <h2>Imágenes</h2>
      <ul v-if="user.images.length">
        <li v-for="image in user.images" :key="image.id">
          <a :href="`/foto/${image.slug}`">{{ image.title }}</a>
        </li>
      </ul>
      <p v-else>No hay imágenes.</p>
    </div>
    <p v-else>Usuario no encontrado.</p>
  </div>
</template>

<script setup>
const { $prisma } = useNuxtApp()
const route = useRoute()

// Asume que el userId viene de params o auth; ajusta según tu lógica de autenticación
const userId = route.params.id || 'some-user-id'  // Reemplaza con lógica real de auth

let user = null
try {
  user = await $prisma.user.findUnique({
    where: { id: userId },
    include: { images: true }
  })
} catch (error) {
  console.error('Error al cargar perfil:', error)
}
</script>