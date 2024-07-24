<script setup>
import {ref, onMounted, reactive} from "vue";
import Logo from "../components/Logo.vue";
import ButtonLink from "../components/Links/ButtonLink.vue";
import Cart from "../components/Cart/Cart.vue";
import Search from "../components/Search/Search.vue";
import {useUserAuthStore} from "../store/userAuthStore.js";
import {computed} from "vue";
import ky from "ky";

const userAuthStore = useUserAuthStore();
const isLogged = computed(() => userAuthStore.getIsLoggedIn());
const isAuthChecked = ref(false);
const categories = reactive([]);
const fetchCategories = async () => {
  try {
    const response = ky.get(`${import.meta.env.VITE_API_BASE_URL}/header-categories`, {
      credentials: "include"
    })
        .then((res) => res.json())
        .then((data) => {
          categories.push(...data);
        });
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  await fetchCategories();;
  await userAuthStore.checkAuthStatus();
  isAuthChecked.value = true;
});
</script>

<template>
  <div class="m-9 flex flex-col gap-14">
    <div id="header" class="flex justify-between items-center flex-wrap gap-8">
      <RouterLink to="/" class="h-fit">
        <Logo color="primary"></Logo>
      </RouterLink>
      <div class="flex justify-between gap-12 items-center flex-wrap" v-if="isAuthChecked">
        <!--   class cursor pointer pour simuler le lien, à voir comportement avec router   -->
        <div class="flex flex-row items-center gap-8" id="top-header-all-links">
          <ButtonLink id="account" v-if="isLogged" class-name="bg-black text-white p-4 uppercase" to="/account" text="Mon compte" />
          <ButtonLink id="account" v-if="!isLogged" class-name="bg-black text-white p-4 uppercase" to="/register" text="Créer un compte" />

          <div class="flex flex-row gap-8" id="top-header-links">
            <RouterLink v-if="isLogged" to="/logout" class="cursor-pointer text-sm uppercase">Déconnexion</RouterLink>
            <RouterLink v-if="!isLogged" to="/login" class="cursor-pointer text-sm uppercase">Se connecter</RouterLink>
            <Cart />
          </div>
        </div>

      </div>
    </div>
    <div class="flex items-center gap-12">
      <RouterLink to="/products" class="text-xl">Tous les produits</RouterLink>
      <RouterLink v-for="name in categories" :key="name" :to="`/products?category=${name}`" class="text-xl category-links">{{ name }}</RouterLink>
      <Search />
    </div>
  </div>
</template>

<style scoped>

@media (max-width: 830px) {
  .category-links {
    display: none;
  }
}

@media (max-width: 566px) {
  #header{
    justify-content: center;
  }
}

@media (max-width: 404px) {
  #top-header-all-links{
    flex-direction: column;
    flex-wrap: wrap;
  }

}

</style>
