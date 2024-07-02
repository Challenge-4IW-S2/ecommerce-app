<script setup>
import { useRoute } from 'vue-router';
import Button from "../Buttons/Button.vue";
import { useEntityForm } from "../../composables/useEntityForm";
import Select from "../Inputs/Select.vue";
import RadioInput from "../Inputs/RadioInput.vue";
import Input from "../Inputs/Input.vue";
const route = useRoute();
const entityType = route.params.entityType;// 'user', 'product', etc.
const entityId = route.params.id;

const { formData, errors, entityStructure, handleSubmit, handleDelete } = useEntityForm(entityType, entityId);

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
            :name="input.name"
            :placeholder="input.name"
            :options="input.options "
            :checked="input.type === 'checkbox' ? formData[input.name] : undefined"
        />
        <p v-if="errors[input.name]" class="text-red-500">{{ errors[input.name] }}</p>
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
