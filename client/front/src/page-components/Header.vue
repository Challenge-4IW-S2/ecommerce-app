<script setup>
import { ref, onMounted } from "vue";
import Logo from "../components/Logo.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import Cart from "../components/Cart/Cart.vue";
import Search from "../components/Search/Search.vue";
import {useUserAuthStore} from "../store/userAuthStore.js";
import {computed} from "vue";

const userAuthStore = useUserAuthStore();
const isLogged = computed(() => userAuthStore.getIsLoggedIn());
const isAuthChecked = ref(false);

onMounted(async () => {
  await userAuthStore.checkAuthStatus();
  isAuthChecked.value = true;
});
</script>

<template>
  <div class="m-9 flex flex-col gap-14">
    <div class="flex justify-between">
      <RouterLink to="/" class="h-fit">
        <Logo color="primary"></Logo>
      </RouterLink>
      <div class="flex justify-between gap-12 items-center" v-if="isAuthChecked">
        <!--   class cursor pointer pour simuler le lien, à voir comportement avec router   -->
          <ButtonLink v-if="isLogged" class-name="bg-black text-white p-4 uppercase" to="/account" text="Mon compte" />
          <RouterLink v-if="isLogged" to="/logout" class="cursor-pointer text-sm uppercase">Déconnexion</RouterLink>

          <ButtonLink v-if="!isLogged" class-name="bg-black text-white p-4 uppercase" to="/register" text="Créer un compte" />
          <RouterLink v-if="!isLogged" to="/login" class="cursor-pointer text-sm uppercase">Se connecter</RouterLink>


        <Cart />
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
