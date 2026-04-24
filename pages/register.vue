<template>
  <div class="container">

    <div class="box">
      <h1>Registro</h1>
      <p class="subtitle">Crea tu cuenta en BurbuArchivo</p>

      <form @submit.prevent="register">

        <input v-model="name" placeholder="Nombre" />

        <input v-model="email" placeholder="Correo" />

        <input
          v-model="password"
          type="password"
          placeholder="Clave"
        />

        <button>Registrarme</button>

      </form>

      <p class="msg">{{ msg }}</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const password = ref('')
const msg = ref('')

const register = async () => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value
    })
  })

  const data = await response.json()

  msg.value = data?.ok
    ? '✅ Usuario creado correctamente'
    : data?.error
}
</script>

<style scoped>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}

.container{
  min-height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  background:rgba(255,255,255,0.6);
  padding:20px;
  font-family:Arial, Helvetica, sans-serif;
}

.box{
  width:100%;
  max-width:420px;
  background:rgba(236,227,229,0.85);
  padding:35px;
  border-radius:16px;
  box-shadow:0 10px 25px rgba(0,0,0,.08);
  border-top:6px solid #ff0033;
}

h1{
  text-align:center;
  color:#d40000;
  margin-bottom:8px;
}

.subtitle{
  text-align:center;
  color:#555;
  margin-bottom:25px;
}

form{
  display:flex;
  flex-direction:column;
  gap:15px;
}

input{
  padding:14px;
  border:2px solid #ddd;
  border-radius:10px;
  outline:none;
  font-size:15px;
  transition:.3s;
  background:white;
}

input:focus{
  border-color:#ff0033;
}

button{
  padding:14px;
  border:none;
  border-radius:10px;
  background:#000000;
  color:white;
  font-size:16px;
  font-weight:bold;
  cursor:pointer;
  transition:.3s;
}

button:hover{
  background:#ff0033;
}

.msg{
  margin-top:18px;
  text-align:center;
  font-weight:600;
  color:#d40000;
}

@media(max-width:500px){

  .box{
    padding:25px;
  }

}
</style>