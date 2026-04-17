<!-- pages/index.vue -->
<template>
  <div class="container-fluid min-vh-100 bg-light">
    <!-- NAVBAR -->
   

    <!-- HERO -->
    <section class="hero py-5 bg-primary text-white">
      <div class="container text-center">
        <div class="row justify-content-center">
          <div class="col-lg-8">
            <h1 class="display-4 fw-bold mb-4">Protege, almacena y publica tus imágenes</h1>
            <p class="lead mb-4 fs-5">
              Plataforma profesional para guardar archivos con marca de agua,
              privacidad y posicionamiento SEO.
            </p>

            <div class="d-flex justify-content-center gap-3 flex-wrap">
              <NuxtLink to="/register" class="btn btn-light btn-lg px-4 shadow">
                <i class="bi bi-rocket-takeoff me-2"></i>Empezar Gratis
              </NuxtLink>

              <NuxtLink to="/login" class="btn btn-outline-light btn-lg px-4">
                <i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="features py-5">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="bi bi-cloud-upload display-4 text-primary"></i>
                </div>
                <h5 class="card-title fw-bold">☁️ Almacenamiento</h5>
                <p class="card-text text-muted">Guarda imágenes rápidas y seguras en la nube.</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="bi bi-shield-check display-4 text-success"></i>
                </div>
                <h5 class="card-title fw-bold">🛡️ Protección</h5>
                <p class="card-text text-muted">Marca de agua automática y control de acceso.</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="bi bi-graph-up display-4 text-info"></i>
                </div>
                <h5 class="card-title fw-bold">🚀 SEO</h5>
                <p class="card-text text-muted">Tus imágenes visibles en Google.</p>
              </div>
            </div>
          </div>

          <div class="col-md-6 col-lg-3">
            <div class="card h-100 border-0 shadow-sm hover-card">
              <div class="card-body text-center p-4">
                <div class="mb-3">
                  <i class="bi bi-eye-slash display-4 text-warning"></i>
                </div>
                <h5 class="card-title fw-bold">🔒 Privado</h5>
                <p class="card-text text-muted">Decide si el archivo será público o privado.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer bg-dark text-white py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">© 2026 BurbuArchivo - Todos los derechos reservados</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.hover-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.navbar-brand:hover {
  color: #d40000 !important;
}

.btn:hover {
  transform: translateY(-2px);
  transition: all 0.3s ease;
}

nav a{
  text-decoration:none;
  color:#000000;
  font-weight:600;
}

nav a:hover{
  color:#ff0033;
}

/* HERO */
.hero{
  text-align:center;
  padding:90px 20px 70px;
}

.hero h1{
  font-size:52px;
  max-width:900px;
  margin:auto;
  color:#000000;
}

.hero p{
  margin-top:20px;
  font-size:20px;
  color:#5a5a5a;
  max-width:700px;
  margin-left:auto;
  margin-right:auto;
}

.buttons{
  margin-top:35px;
  display:flex;
  justify-content:center;
  gap:15px;
  flex-wrap:wrap;
}

.btn{
  padding:14px 28px;
  border-radius:10px;
  text-decoration:none;
  font-weight:bold;
  transition:0.3s;
}

.primary{
  background:#ff0033;
  color:#ffffff;
}

.primary:hover{
  background:#d40000;
}

.secondary{
  background:#000000;
  color:#ffffff;
}

.secondary:hover{
  background:#333333;
}

/* FEATURES */
.features{
  padding:40px 30px 70px;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:20px;
}

.card{
  background:#ece3e5;
  padding:25px;
  border-radius:14px;
  border-left:5px solid #ff0033;
}

.card h3{
  margin-bottom:12px;
  color:#000000;
}

.card p{
  color:#444;
  line-height:1.5;
}

/* FOOTER */
.footer{
  text-align:center;
  padding:30px;
  background:#d40000;
  color:white;
  font-weight:600;
}

/* RESPONSIVE */
@media(max-width:768px){

  .navbar{
    flex-direction:column;
    gap:15px;
  }

  .hero h1{
    font-size:34px;
  }

  .hero p{
    font-size:18px;
  }

}
</style>