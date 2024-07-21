<script setup>
import RadioInput from "../../components/Inputs/RadioInput.vue";
import {onMounted, ref} from "vue";
import ky from "ky";
const url = import.meta.env.VITE_API_BASE_URL;
const formData = ref({});
const errors = ref({});
const entityStructure = ref([]);
const fetchPreferences = async () => {
  try {
    const response = await ky.get(`${url}/preferences`, {
      credentials: 'include'
    }).json();
    console.log(response)
    entityStructure.value = response.map(pref => ({
      id: pref.id,
      name: pref.name,
      description: pref.description,
      activated: pref.activated
    }));
      formData.value = response.reduce((acc, pref) => {
        acc[pref.name] = pref.activated;
        return acc;
      }, {});
  } catch (error) {
    console.error('Failed to fetch preferences', error);
  }
};
const handleSubmit = async ({ name, activated }) => {
  console.log(name, activated)
  try {
    await ky.put(`${url}/preferences`, {
      json: {
        preference_id: name,
        activated: activated
      },
      credentials: 'include'
    });
    alert('Preferences updated successfully');
  } catch (error) {
    console.error('Failed to update preferences', error);
    errors.value = error.response?.data?.errors || {};
  }
};

onMounted(fetchPreferences);

</script>

<template>
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16 ">

    <h1 class="text-center text-3xl">Modifier les abonnements</h1>
    <p class="text-center mb-5">Sélectionnez les abonnements que vous souhaitez recevoir</p>
    <div class="">
        <div v-for="input in entityStructure" :key="input.name" class="mb-4 text-center">
          <Component
              :is="RadioInput"
              v-model="formData[input.name]"
              :id="input.name"
              :title="input.description"
              :name="input.id"
              @change="handleSubmit"
          />
          <p v-if="errors[input.name]" class="text-red-500">{{ errors[input.name] }}</p>

      </div>
    </div>
  </div>
</template>

<style scoped>

</style>