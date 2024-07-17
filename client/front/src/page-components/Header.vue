<script setup>

import Logo from "../components/Logo.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import Cart from "../components/Cart/Cart.vue";
import Search from "../components/Search/Search.vue";
import ky from "ky";


const logout = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/logout`, {
      credentials: 'include',
    });
  } catch (e) {
    console.log(e);
  }
}

</script>

<template>
  <div class="m-9 flex flex-col gap-14">
    <div class="flex justify-between">
      <RouterLink to="/" class="h-fit">
        <Logo color="primary"></Logo>
      </RouterLink>
      <div class="flex justify-between gap-12 items-center">
        <!--   class cursor pointer pour simuler le lien, à voir comportement avec router   -->

        <ButtonLink class-name="bg-black text-white p-4 uppercase" to="register" text="Créer un compte" />
        <RouterLink to="login" class="cursor-pointer text-sm uppercase">Se connecter</RouterLink>

<<<<<<< HEAD
        <Button class="cursor-pointer text-sm" @click="logout">DÉCONNEXION</Button>
        <span class="cursor-pointer text-sm">PANIER (0)</span>
        <Cart />
=======
        <RouterLink to="account" class="cursor-pointer text-sm uppercase">Mon compte</RouterLink>
        <Button class="cursor-pointer text-sm uppercase" @click="logout">Déconnexion</Button>
        <span class="cursor-pointer text-sm uppercase">Panier (0)</span>
>>>>>>> c20717b (commit test)
      </div>
    </div>
    <div class="flex items-center gap-12">
      <a href="/products" class="text-xl">Tous les produits</a>
      <a href="#" class="text-xl">Tapes-in</a>
      <a href="#" class="text-xl">Tissages</a>
      <a href="#" class="text-xl">Extension à clip</a>
      <a href="#" class="text-xl">Cosmétiques</a>
      <Search />
    </div>
  </div>
</template>

<style scoped>

</style>
