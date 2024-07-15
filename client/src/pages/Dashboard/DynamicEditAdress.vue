<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import ky from 'ky';
import Input from "../../components/Inputs/Input.vue";
import { fetchModelStructure, filterUnwantedFields } from "../../functions/model.js";

// Définir les props
const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

const route = useRoute();
const router = useRouter();
const entityId = route.params.id;
console.log('entityId:', entityId);
const formStructure = ref([]);
const formData = ref({});
const unwantedFields = ['createdAt', 'updatedAt', 'id'];

const goBack = () => {
  router.go(-1);
};

// Fonction pour récupérer la structure du modèle et initialiser les données du formulaire
const fetchStructure = async (modelName) => {
  try {
    const structure = await fetchModelStructure(modelName);
    formStructure.value = structure.filter(field => !unwantedFields.includes(field.name));
    const defaultValues = structure.reduce((acc, field) => {
      if (!unwantedFields.includes(field.name)) {
        acc[field.name] = field.defaultValue || '';
      }
      return acc;
    }, {});
    formData.value = { ...defaultValues, user_id: props.userId };

    if (entityId) {
      const addressData = await ky.get(`${import.meta.env.VITE_API_BASE_URL}address/${entityId}/`).json();
      formData.value = { ...formData.value, ...addressData };
      console.log('formData:', formData.value)
    }
  } catch (error) {
    console.error('Failed to fetch model structure:', error);
  }
};

const handleSubmit = async () => {
  try {
    if (entityId) {
      await ky.patch(`${import.meta.env.VITE_API_BASE_URL}address/${entityId}`, {
        json: formData.value
      }).json();
    } else {
      await ky.post(`${import.meta.env.VITE_API_BASE_URL}address`, {
        json: formData.value
      }).json();
    }
    router.go(-1);
  } catch (error) {
    console.error('Failed to submit address:', error);
  }
};

onMounted(() => {
  fetchStructure('Address');
});
</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h1 class="text-center text-3xl">{{ entityId ? 'Modifier' : 'Ajouter' }} une adresse</h1>
    <p class="text-center">Remplissez le formulaire ci-dessous pour {{ entityId ? 'modifier' : 'ajouter' }} une adresse</p>
    <div class="flex justify-end">
      <button @click="goBack" class="bg-black px-4 text-white h-12 block text-center content-center">Retour</button>
    </div>
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div v-for="field in formStructure" :key="field.name" class="mb-4">
          <Input
              :title="field.name"
              :name="field.name"
              :placeholder="field.name"
              v-model="formData[field.name]"
              :type="field.name.includes('email') ? 'email' : field.name.includes('password') ? 'password' : field.name.includes('phone') ? 'tel' : 'text'"
              :disabled="field.name === 'user_id'"

          />
        </div>
        <div class="flex justify-end">
          <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Styles spécifiques */
</style>
