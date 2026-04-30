// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',

  devtools: {
    enabled: true
  },

  css: [
    '~/assets/css/main.css',
    'bootstrap/dist/css/bootstrap.min.css',
     '~/assets/css/global.css'
  ],

  modules: [], 

  experimental: {
    payloadExtraction: false
  },

runtimeConfig: {
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },

  nitro: {
    maxBodySize: 100 * 1024 * 1024, // 100MB for file uploads
  },

  vite: {
    server: {
      hmr: true,
      watch: {
        ignored: ['**/node_modules/**', '**/.nuxt/**']
      }
    },
    optimizeDeps: {
      force: true
    }
  }
})