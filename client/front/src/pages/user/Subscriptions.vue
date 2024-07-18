<script setup>
import RadioInput from "../../components/Inputs/RadioInput.vue";
import Button from "../../components/Buttons/Button.vue";
import {useEntityForm} from "../../composables/useEntityForm.ts";
import {onMounted, ref} from "vue";
import ky from "ky";
const url = import.meta.env.VITE_API_BASE_URL;
const formData = ref({
  RESTOCK: false,
  PRICE: false,
  NEW: false,
  NEWS: false
});
const errors = ref({});
const entityStructure = ref([
  { name: 'RESTOCK', type: 'checkbox' },
  { name: 'PRICE', type: 'checkbox' },
  { name: 'NEW', type: 'checkbox' },
  { name: 'NEWS', type: 'checkbox' }
]);
const fetchPreferences = async () => {
  try {
    const response = await ky.get(`${url}/preferences`).json();
      formData.value = response.reduce((acc, pref) => {
        acc[pref.name] = pref.activated;
        return acc;
      }, {});
  } catch (error) {
    console.error('Failed to fetch preferences', error);
  }
};
const handleSubmit = async () => {
  try {
    for (const key in formData.value) {
      await ky.put(`${url}/preferences`, {
        json: {
          name: key,
          activated: formData.value[key]
        }
      });
    }
    alert('Preferences updated successfully');
  } catch (error) {
    console.log(error.response.data.errors || {})
    console.error('Failed to update preferences', error);
    errors.value = error.response.data.errors || {};
  }
};

onMounted(fetchPreferences);

</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 ">

    <h1 class="text-center text-3xl">Modifier les abonnements</h1>
    <p class="text-center mb-5">Sélectionnez les abonnements que vous souhaitez recevoir</p>
    <div class="flex-col">
      <form @submit.prevent="handleSubmit" class="flex-col">
        <div v-for="input in entityStructure" :key="input.name" class="mb-4">
          {{ formData[input.name] }}
          <component
              :is="RadioInput"
              :type="input.type"
              v-model="formData[input.name]"
              :id="input.name"
              :title="input.name"
              :name="input.name"
          />
          <p v-if="errors[input.name]" class="text-red-500">{{ errors[input.name] }}</p>
        </div>
        <Button text="Enregistrer" />
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>