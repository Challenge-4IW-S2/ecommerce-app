<script setup>
import { useRoute } from 'vue-router';
import DynamicForm from "../components/Form/DynamicForm.vue";

const route = useRoute();

const entityType = route.params.entityType; // 'user', 'product', etc.
const entityId = route.params.id;

</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h1 class="text-center text-3xl">{{ entityId ? 'Modifier' : 'Ajouter' }} un {{ entityType }}</h1>
    <p class="text-center">Remplissez le formulaire ci-dessous pour {{ entityId ? 'modifier' : 'ajouter' }} un {{ entityType }}</p>
    <div class="flex justify-end">
      <router-link to="`/admin/entityTypes`" class="bg-black px-4 text-white h-12 block text-center content-center">Retour</router-link>
    </div>
    <DynamicForm :entityType="entityType" :entityId="entityId"/>
  </div>
</template>


<style scoped>
/* Styles spécifiques */
</style>
