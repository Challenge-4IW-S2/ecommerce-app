<script setup>
import { useRoute, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import ky from 'ky';
import Input from "../../components/Inputs/Input.vue";
import {fetchModelStructure, filterUnwantedFields} from "../../functions/model.js";
import {useFormHandler} from '../../composables/useFormHandler';
import Button from "../../components/Buttons/Button.vue";
const props = defineProps({
  userId: {
    type: String,
    required: true
  }
});

const route = useRoute();
const router = useRouter();
const entityId = route.params.id;

const formStructure = ref([]);
 const url = entityId
    ? `${import.meta.env.VITE_API_BASE_URL}/address/${entityId}`
    : `${import.meta.env.VITE_API_BASE_URL}/address`;

const goBack = () => {
  router.go(-1);
};

const {
  formData,
  validationErrors,
  serverError,
  isSubmitting,
  handleSubmit,
  resetErrors
} = useFormHandler('address', {user_id: props.userId},url);
const fetchEntityStructure = async (modelName) => {
  try {
    const unwantedFields = ['createdAt', 'updatedAt', 'id','user_id'];
    let response = {};
    if (entityId) {
      response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/address/${entityId}/`, {
        credentials: "include"
      }).json();
    } else {
      const structure = await fetchModelStructure(modelName);
      response = structure.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
      }, {});
    }

    const cleanedResponse = filterUnwantedFields(response, unwantedFields);
    formStructure.value = Object.keys(cleanedResponse).map(key => {
      const field = {
        name: key,
        value: cleanedResponse[key],
        type: getTypeForKey(key, cleanedResponse[key])
      };
      return field;
    });

    initializeFormData();
  } catch (error) {
    console.error('Failed to fetch entity structure:', error);
  }
};

const initializeFormData = () => {
  formStructure.value.forEach(field => {
    formData.value[field.name] = field.value || '';
    formData.value['user_id'] = props.userId;
  });
};

const getTypeForKey = (key, value) => {
  if (key.includes('email')) return 'email';
  if (key.includes('password')) return 'password';
  if (key.includes('phone')) return 'tel';
  return 'text';
};

onMounted(() => {
  fetchEntityStructure('Address');
});
</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
    <h1 class="text-center text-3xl">{{ entityId ? 'Modifier' : 'Ajouter' }} une adresse</h1>
    <p class="text-center">Remplissez le formulaire ci-dessous pour {{ entityId ? 'modifier' : 'ajouter' }} une adresse</p>
    <div class="flex justify-end mb-4">
      <button @click="goBack" class="bg-black px-4 text-white h-12">Retour</button>
    </div>
    <form @submit.prevent="handleSubmit(url,entityId ? 'PATCH' : 'POST')">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div v-for="field in formStructure" :key="field.name" class="mb-4">
          <Input
              :id="field.name"
              :title="field.name"
              :name="field.name"
              :placeholder="field.name"
              v-model="formData[field.name]"
              :disabled="field.name === 'user_id'"
          />
          <div v-if="validationErrors[field.name]" class="text-red-500 text-sm">
            {{ validationErrors[field.name]}}
          </div>
        </div>
      </div>
      <div v-if="serverError" class="text-red-500 text-sm mt-2">
        {{ serverError }}
      </div>
      <Button text="Submit" :disabled="isSubmitting"/>
    </form>
  </div>
</template>
<style scoped>
/* Styles spécifiques */
</style>
