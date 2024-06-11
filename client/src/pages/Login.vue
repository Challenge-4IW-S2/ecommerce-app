<script setup>


import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import {ref} from "vue";

const email = ref('')

function logEmail() {
  console.log(email.value)
}
</script>

<template>
  <div class="w-125 m-auto flex flex-col gap-16 mt-20">
    <h1>
      Connectez-vous à votre compte
    </h1>
    <button @click="logEmail">
      dadad
    </button>
    <form>
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
            placeholder="Mot de passe"></Input>
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
