<script setup>
import { useRoute } from 'vue-router';
import Button from "../Buttons/Button.vue";
import { useEntityForm } from "../../composables/useEntityForm";
import Select from "../Inputs/Select.vue";
import RadioInput from "../Inputs/RadioInput.vue";
import Input from "../Inputs/Input.vue";
import AdressCard from "../Cards/AdressCard.vue";
import {toRefs} from "vue";
import ProductPicture from "../Carousel/ProductPicture.vue";
const props = defineProps({
  entityType: {
    type: String,
    required: true
  },
  entityId: {
    type: String,
    required: false
  }
});
const { entityType, entityId } = toRefs(props);
const { formData, errors, entityStructure, handleSubmit, handleDelete, addressOptions, images } = useEntityForm(entityType.value, entityId.value,import.meta.env.VITE_API_BASE_URL);
</script>
<template>
    <form @submit.prevent="handleSubmit">
      <div class="grid gap-6 mb-6 md:grid-cols-2">
        <div v-for="input in entityStructure" :key="input.name">
          <component
              :is="input.is === 'select' ? Select : input.type === 'checkbox' ? RadioInput : Input"
              :type="input.type"
               v-model="formData[input.name]"
              :id="input.name"
              :title="input.name"
              :name="input.name"
              :placeholder="input.name"
              :options="input.options "
              :checked="input.type === 'checkbox' ? formData[input.name] : undefined"
          />
          <p v-if="errors[input.name]" class="text-red-500">{{ errors[input.name] }}</p>
        </div>
      </div>
        <div v-if="entityType === 'user' && entityId">
            <div class="flex justify-between">
              <h2 class="text-lg font-bold">Addresses</h2>
              <router-link :to="`/admin/add-address/${entityId}`" class="text-sm underline font-normal">Ajouter une adresse</router-link>
            </div>
            <AdressCard v-if="addressOptions.length > 0"
                :address="addressOptions"
                :userId="entityId"
            />
          </div>
          <div v-else>
            <p>No address found</p>
          </div>
        <div v-if="entityType === 'product' && entityId">
          <div class="flex justify-between">
            <h2 class="text-lg font-bold">Images</h2>
            <router-link :to="`/admin/add-productPicture/${entityId}`" class="text-sm underline font-normal">Ajouter une image</router-link>
          </div>
          <div class="grid gap-6 mt-4 md:grid-cols-2">
            <div v-if="images.length > 0">
              <ProductPicture :images="images" :product-id="entityId"  />
            </div>
            </div>
          </div>
      <div class="flex justify-end">
        <Button text="Submit" />
        <Button v-if="entityId" text="Delete" @click.prevent="handleDelete" class="ml-2 bg-red-500 hover:bg-red-600 text-white" />
      </div>
    </form>
</template>

<style scoped>
/* Styles spécifiques */
</style>
