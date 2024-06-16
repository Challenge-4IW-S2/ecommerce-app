<script setup>


import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import ky from "ky";
import {ref} from "vue";

const email = ref('')
const password = ref('')
const msgError = ref('')


const connect = async () => {
  try {
    const response = await ky.post("http://localhost:8000/login", {
      json: {
        email: email.value,
        password: password.value,
      },
    }).json();
    if (!response.ok) {
      msgError.value = await response.text();
    } else {
      const data = await response.json();
    }
  } catch (error) {
    msgError.value = 'Votre email ou votre mot de passe sont incorrects.';
  }
};

</script>

<template>
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
            v-model:value="email"></Input>
        <Input
            id="password"
            type="password"
            title="Mot de passe"
            placeholder="Mot de passe"
            v-model:value="password"
        ></Input>
      </div>
      <div class="flex flex-col gap-4 mt-5">
        <a href="#" class="text-xs font-medium border-b border-black w-fit">Récupérer mon compte</a>
        <Button text="Connexion" type="submit"></Button>
        <ButtonLink
            class="bg-transparent text-black border border-black"
            to="linktodefine"
            text="Créer un compte"></ButtonLink>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>
