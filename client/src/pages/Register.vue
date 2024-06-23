<script setup>

import Input from "../components/Inputs/Input.vue";
import Button from "../components/Buttons/Button.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";


</script>

<template>
  <div>
    <div class="m-auto max-w-125">
      <h1>
        Créer votre compte Luzaya
      </h1>
      <form>
        <div class="flex flex-col gap-y-5">

          <Input
              id="firstname"
              title="Prénom"
              placeholder="Prénom"
          />
          <Input
              id="lastname"
              title="Nom"
              placeholder="Nom"
          />
          <div class="flex flex-wrap gap-y-5 gap-x-8">
            <Input
                id="email"
                type="email"
                title="Adresse e-mail"
                placeholder="Adresse e-mail"
                class="flex-grow"
            />
            <Input
                id="confirme-email"
                type="email"
                title="Confirmer votre adresse e-mail"
                placeholder="Adresse e-mail"
                class="flex-grow"
            />
          </div>
          <div class="flex flex-wrap gap-y-5 gap-x-8">
            <Input
                id="password"
                type="password"
                title="Mot de passe"
                placeholder="Mot de passe"
                class="flex-grow"
            />
            <Input
                id="confirme-password"
                type="password"
                title="Confirmer votre mot de passe"
                placeholder="Mot de passe"
                class="flex-grow"
            />
          </div>
          <Input
              id="birthdate"
              type="date"
              title="Date de naissance"
          />
          <Button
              text="Devenir membre Luzaya"
          />
          <ButtonLink
              class-name="bg-transparent text-black border border-black"
              text="Connexion"
              to="/login"
          />
        </div>
      </form>
    </div>
  </div>

</template>

<style scoped>


</style>
