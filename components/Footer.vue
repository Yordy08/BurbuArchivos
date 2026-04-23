<template>
  <footer class="bg-dark text-light mt-auto">
    <div class="container py-5">
      <div class="row">
                   

        
      </div>

      <hr class="my-4">

      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0">
            &copy; 2024 Burbu Archivos. Todos los derechos reservados.
          </p>
        </div>
        <div class="col-md-6 text-md-end">
          <NuxtLink to="/privacidad" class="text-light text-decoration-none me-3">
            Política de Privacidad
          </NuxtLink>
          <NuxtLink to="/terminos" class="text-light text-decoration-none">
            Términos de Servicio
          </NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer a:hover {
  color: #0d6efd !important;
  transition: color 0.3s ease;
}

hr {
  border-color: rgba(255, 255, 255, 0.1);
}
</style>