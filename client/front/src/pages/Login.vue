<script setup>
import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import ky from "ky";
import {ref} from "vue";
import {  useRouter } from "vue-router";

// For connect user bag
import { useUserStore } from "../store/userStore";
const userStore = useUserStore();

const router = useRouter()

const token = router.currentRoute.value.query.token

const verifyToken = async (token) => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/verify-token/${token}`, {
      credentials: "include"
    });
    if (response.ok) {
      const data = await response.json();
      msgError.value =
        `<div class="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
  <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div>
    Votre compte a été vérifié avec succès
  </div>
</div>`;
    }
  } catch (error) {
    const httpCode = error.response.status;
    switch (httpCode) {
      case 404:
        msgError.value = 'Le token est invalide';
        break;
      case 401:
        msgError.value = 'Aucun compte trouvé avec les informations que vous avez fournies';
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
const msgValidation = ref('')

const setErrorWithHtml = () => {
  msgError.value = `
  <div id="alert-2" class="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">
    Aucun compte trouvé avec les informations que vous avez fournies
  </div>
</div>
  `;
};

const setValidateWithHtml = () => {
  msgValidation.value = `
  <div id="alert-4" class="flex items-center p-4 mb-4 text-yellow-800 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300" role="alert">
  <svg class="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
  </svg>
  <span class="sr-only">Info</span>
  <div class="ms-3 text-sm font-medium">
    Si vous n'avez pas vérifié votre compte, la connexion sera impossible
  </div>
</div>
  `;
};

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
        setErrorWithHtml();
        setValidateWithHtml();
        break;
      case 403:
          await router.replace(`/edit-password?email=${email.value}`);
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
      <div v-html="msgError" v-if="msgError"></div>
      <div v-html="msgValidation" v-if="msgValidation"></div>
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
