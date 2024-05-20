<script setup>


import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
</script>

<template>
  <div class="w-125 m-auto flex flex-col gap-16 mt-20">
    <h1>
      Connectez-vous à votre compte
    </h1>
    <form>
      <div class="flex flex-col gap-4">
        <Input
            id="e-mail"
            type="email"
            title="Adresse e-mail"
            placeholder="Adresse e-mail"></Input>
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
