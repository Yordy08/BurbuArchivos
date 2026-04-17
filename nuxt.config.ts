// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.min.css'
  ],

  modules: ['@prisma/nuxt'],  // Agregado para integrar Prisma

  runtimeConfig: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    databaseUrl: process.env.DATABASE_URL,  // Agregado para Prisma

    public: {}
  },

  vite: {
    server: {
      hmr: {
        overlay: false  // Desactiva overlay para reducir IPC issues
      }
    }
  }
})