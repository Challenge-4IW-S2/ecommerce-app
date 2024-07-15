<script setup>

import Logo from "../components/Logo.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
</script>

<template>
  <div class="m-9 flex flex-col gap-14">
    <div class="flex justify-between">
      <Logo color="primary"></Logo>
      <div class="flex justify-between gap-12 items-center">
        <!--   class cursor pointer pour simuler le lien, à voir comportement avec router   -->
        <ButtonLink class-name="bg-black text-white p-4" to="register" text="CRÉER UN COMPTE" />
        <RouterLink to="login" class="cursor-pointer text-sm">SE CONNECTER</RouterLink>
        <span class="cursor-pointer text-sm">PANIER (0)</span>
      </div>
    </div>
    <div class="flex items-center gap-12">
      <a href="#" class="text-xl">Tapes-in</a>
      <a href="#" class="text-xl">Tissages</a>
      <a href="#" class="text-xl">Extension à clip</a>
      <a href="#" class="text-xl">Cosmétiques</a>
      <svg class="cursor-pointer" width="16" height="13" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.8137 8.32688C6.99278 9.2873 5.80614 9.89066 4.48642 9.89066C2.00864 9.89066 0 7.76379 0 5.14016C0 2.51652 2.00864 0.389648 4.48642 0.389648C6.96421 0.389648 8.97285 2.51652 8.97285 5.14016C8.97285 5.99809 8.75806 6.80291 8.38232 7.4976L14.0257 10.4854L13.5987 11.3896L7.8137 8.32688ZM7.97285 5.14016C7.97285 7.26616 6.3588 8.89066 4.48642 8.89066C2.61404 8.89066 1 7.26616 1 5.14016C1 3.01415 2.61404 1.38965 4.48642 1.38965C6.3588 1.38965 7.97285 3.01415 7.97285 5.14016Z"
              fill="black"
        />
      </svg>

    </div>
  </div>
</template>

<style scoped>

</style>
