<script setup>
import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import ky from "ky";
import {ref} from "vue";
import { useRouter } from "vue-router";

const router = useRouter()

const token = router.currentRoute.value.query.token

const verifyToken = async (token) => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/verify-token/${token}`);
    console.log(response)
    if (response.ok) {
      const data = await response.json();
      msgError.value ="Compte vérifié, vous pouvez vous connecter";
    }
  } catch (error) {

    switch (httpCode) {
      case 404:
        msgError.value = 'Le token est invalide';
        break;
      case 401:
        msgError.value = 'Aucun compte trouvé avec les informations que vous avez fournies';
        break;
        case 429:
        msgError.value = 'Plusieurs tentatives de connexion ont été effectuées, veuillez réessayer plus tard';
        break;
      default:
        msgError.value = 'Une erreur est survenue';
        break;
    }
  }
};

if (token) {
  verifyToken(token)
} else {
}

const email = ref('')
const password = ref('')
const msgError = ref('')


const connect = async () => {
  try {
    const response = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
      json: {
        email: email.value,
        password: password.value,
      },
      credentials: 'include'
    });
    if (response.ok) {
     await router.replace('/');
    }
  } catch (error) {
    const httpCode = error.response.status;
    switch (httpCode) {
      case 401:
        msgError.value = 'Aucun compte trouvé avec les informations que vous avez fournies';
        break;
      case 403:
          await router.replace(`/edit-password?email=${email.value}`);
        break;
      case 429:
        msgError.value = 'Plusieurs tentatives de connexion ont été effectuées, veuillez réessayer plus tard';
        break;
      default:
        msgError.value = 'Une erreur est survenue';
        break;
    }
  }
};

</script>

<template>
  <div>
    <div class="max-w-125 m-auto">
      <h1 class="mb-4">
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
              class-name="bg-transparent text-black border border-black h-12"
              text="Créer un compte"
              to="/register"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>
