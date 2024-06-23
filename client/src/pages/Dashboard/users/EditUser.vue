<script setup>
import EditForm from "../../../components/Form/DynamicForm.vue";
import {computed, onMounted, ref} from "vue";
import ky from "ky";
import {useRoute} from "vue-router";
import DynamicForm from "../../../components/Form/DynamicForm.vue";
import {fetchModelStructure} from "../../functions/model.js";
const route = useRoute();
const modelStructure = ref([]);
const id = computed(() => route.params.id);
const getRoleOptions = async () => {
  try {
    const response = await ky.get("http://localhost:8000/role").json();
    return response.map(role => ({
      value: role.id,
      label: role.name
    }));
  } catch (error) {
    console.error('Failed to fetch roles:', error);
   return [];
  }
};
const getModelStructure = async () => {
  try {
    //Recuperer le user passer dans l'url
    const response = await ky.get(`http://localhost:8000/users/${id.value}`).json();
    if (response){
      const roles = await getRoleOptions();
      modelStructure.value = Object.keys(response).map(key => {
        let field = {
          name: key,
          value: response[key],
          type: getTypeForKey(key)  // Déterminer le type en utilisant getTypeForKey
        };
        if (key === 'role') {
          field.is = 'select';
          field.options = roles;
        }
        if (typeof field.value === 'string') {
          field.type = 'text';
        }
        if (key === 'password') {
          field.type = 'password';
        }
        return field;
      });
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};
const handleFormSubmit = async (formData) => {
  console.log(formData);
};

const getTypeForKey = (key) => {
  switch (key) {
    case 'email':
      return 'email';
    case 'password':
      return 'password';
    case 'phone':
      return 'tel';
    case 'role':
      return 'select';
    default:
      return 'text';
  }
};
onMounted(() => {
  getModelStructure();
});
console.log(modelStructure);
</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h1 class="text-center text-3xl">Modifier un utilisateur</h1>
    <p class="text-center">Remplissez le formulaire ci-dessous pour le modifier </p>
    <div class="flex justify-end">
      <router-link to="/admin/users" class="bg-black px-4 text-white h-12 block text-center content-center">Retour</router-link>
    </div>
      <div>
        <DynamicForm :inputs="modelStructure" @submit="handleFormSubmit"  />
      </div>
    </div>

</template>

<style scoped>

</style>