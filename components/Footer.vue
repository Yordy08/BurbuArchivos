<template>
  <footer class="bg-dark text-light mt-auto">
    <div class="container py-5">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
          <h5 class="fw-bold mb-3">
            <i class="bi bi-camera me-2"></i>
            BurbuArchivos
          </h5>
          <p class="mb-3">
            Tu plataforma confiable para almacenar y compartir imágenes de manera segura.
            Gestiona tus fotos con facilidad y privacidad.
          </p>
          <div class="d-flex">
            <a href="#" class="text-light me-3 fs-4" aria-label="Facebook">
              <i class="bi bi-facebook"></i>
            </a>
            <a href="#" class="text-light me-3 fs-4" aria-label="Twitter">
              <i class="bi bi-twitter"></i>
            </a>
            <a href="#" class="text-light me-3 fs-4" aria-label="Instagram">
              <i class="bi bi-instagram"></i>
            </a>
            <a href="#" class="text-light fs-4" aria-label="LinkedIn">
              <i class="bi bi-linkedin"></i>
            </a>
          </div>
        </div>

        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="fw-bold mb-3">Enlaces</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <NuxtLink to="/" class="text-light text-decoration-none">
                Inicio
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/galeria" class="text-light text-decoration-none">
                Galería
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/subir" class="text-light text-decoration-none">
                Subir Imagen
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/acerca" class="text-light text-decoration-none">
                Acerca de
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="col-lg-2 col-md-6 mb-4">
          <h6 class="fw-bold mb-3">Cuenta</h6>
          <ul class="list-unstyled">
            <li class="mb-2">
              <NuxtLink to="/login" class="text-light text-decoration-none">
                Iniciar Sesión
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/register" class="text-light text-decoration-none">
                Registrarse
              </NuxtLink>
            </li>
            <li class="mb-2">
              <NuxtLink to="/perfil" class="text-light text-decoration-none">
                Mi Perfil
              </NuxtLink>
            </li>
            <li class="mb-2">
              <a href="#" class="text-light text-decoration-none">
                Configuración
              </a>
            </li>
          </ul>
        </div>

        <div class="col-lg-4 col-md-6 mb-4">
          <h6 class="fw-bold mb-3">Contacto</h6>
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-envelope me-3"></i>
            <span>contacto@burbuarchivos.com</span>
          </div>
          <div class="d-flex align-items-center mb-2">
            <i class="bi bi-telephone me-3"></i>
            <span>+1 (555) 123-4567</span>
          </div>
          <div class="d-flex align-items-start mb-3">
            <i class="bi bi-geo-alt me-3 mt-1"></i>
            <span>123 Calle Principal<br>Ciudad, Estado 12345</span>
          </div>
        </div>
      </div>

      <hr class="my-4">

      <div class="row align-items-center">
        <div class="col-md-6">
          <p class="mb-0">
            &copy; 2024 BurbuArchivos. Todos los derechos reservados.
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