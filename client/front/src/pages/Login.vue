<script setup>
import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import ky from "ky";
import {ref} from "vue";
import Swal from "sweetalert2";
import {  useRouter } from "vue-router";
// import jwt_decode from "jwt-decode";

// For connect user bag
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();

const router = useRouter()
const email = ref('')
const password = ref('')
const msgError = ref('')
// let row = jwt_decode(document.cookie) // decode the cookie

const connect = async () => {
  try {
    console.log(`${import.meta.env.VITE_API_BASE_URL}login`)
    const response = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      json: {
        email: email.value,
        password: password.value,
      }, credentials: 'include'
    } ).json();
    if (response) {
      if (response.status === 401) {
        return msgError.value = 'Votre email ou votre mot de passe sont incorrects.';
      }
      if (response.is_verified === false){
        Swal.fire({
          title: 'Votre compte n\'est pas vérifié',
          text: 'Un email de vérification vous a été envoyé',
          icon: 'warning',
          confirmButtonText: 'OK'
        })
      }
      console.log(response.status)
      if (response.status === 200) {
       let cookie = response.cookie
        console.log(cookie)
        console.log(document.cookie)
        userStore.updateSessionId(userStore.user, response.user.id)
          if (response.user.role === 'admin') {
            await router.push('/admin/dashboard')
          } else {
            await router.push(`/admin/user/${row.id}`)
        }
      }

    } else {
      const data = await response.json();
    }
  } catch (error) {
    msgError.value = 'Votre email ou votre mot de passe sont incorrects.';
  }
};

const checkAuth = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/test-auth`, {
      credentials: 'include',

    }).json();
    console.log(response);
    console.log('logged');
  } catch (error) {
    console.log(error)
    console.log('err');
  }
}

const logout = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {credentials: 'include'}).json();
    console.log(response);
    console.log('logged out');
  } catch (error) {
    console.log(error)
    console.log('err');
  }
}

</script>

<template>
  <!--     create a button that try the get route /check-auth on api (TO TEST JWT-->

  <button @click="checkAuth">Check Auth</button>&nbsp;
  <button @click="logout">logout</button>

  <div class="w-125 m-auto flex flex-col gap-16 mt-20">
    <h1>
      Connectez-vous à votre compte
    </h1>
    <small class="error" v-if="msgError" >
      {{ msgError }}
    </small>
    <form @submit.prevent="connect">
      <div class="flex flex-col gap-4">
        <Input
            id="e-mail"
            type="email"
            title="Adresse e-mail"
            placeholder="Adresse e-mail"
            v-model="email"></Input>
        <Input
            id="password"
            type="password"
            title="Mot de passe"
            placeholder="Mot de passe"
            v-model="password"
        ></Input>
      </div>
      <div class="flex flex-col gap-4 mt-5">
        <a href="#" class="text-xs font-medium border-b border-black w-fit">Récupérer mon compte</a>
        <Button text="Connexion" type="submit"></Button>
        <ButtonLink
            class="bg-transparent text-black border border-black"
            to="register"
            text="Créer un compte"></ButtonLink>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
