<!-- views/User/AddUser.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { fetchModelStructure } from "../../../functions/model.js";
import DynamicForm from "../../../components/Form/DynamicForm.vue";
import Button from "../../../components/Buttons/Button.vue";
import ky from "ky";
const modelStructure = ref([]);
const modelName = 'User';

const getRoles = async () => {
  const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users/roles`).json();

  return response;
};
const getModelStructure = async () => {
  const [structure] = await Promise.all([fetchModelStructure(modelName)]);
  if (structure) {
    modelStructure.value = structure.map(field => {
      if (field.name === 'role') {
        field.is = 'select';
        field.options = [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' },
        ];
      }
      if (field.type==='STRING'){
        field.type = 'text';
      }
      if(field.name === 'password'){
        field.type = 'password';
      }
      return field;
    });
  }
};
const handleFormSubmit = async (formData) => {
  const data = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/signup`, {
    json: formData,
  }).json();
};

onMounted(() => {
  getModelStructure();
});
</script>
<template>
  <div>
    <h1 class="text-center text-3xl">Ajouter un utilisateur</h1>
    <p class="text-center">Remplissez le formulaire ci-dessous pour ajouter un utilisateur</p>
    <div class="">
      <div class="flex justify-end">
        <router-link to="/admin/users" class="bg-black text-white h-12 block text-center content-center">Retour</router-link>
      </div>
      <div v-if="modelStructure.length > 0">
        <DynamicForm :inputs="modelStructure" @submit="handleFormSubmit" />
      </div>
      <div v-else>
        Loading...
      </div>
    </div>
  </div>
</template>