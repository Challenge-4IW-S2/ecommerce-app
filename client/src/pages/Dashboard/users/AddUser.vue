<!-- views/User/AddUser.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { fetchModelStructure } from "../../functions/model.js";
import DynamicForm from "../../../components/Form/DynamicForm.vue";
const modelStructure = ref([]);
const modelName = 'Product';

const getModelStructure = async () => {
  const [structure] = await Promise.all([fetchModelStructure(modelName)]);
  if (structure) {
    modelStructure.value = structure.map(field => {
      if (field.name === 'role') {
        // Exemple de configuration pour un champ select
        field.type = 'select';
        field.options = [
          { value: 'admin', label: 'Admin' },
          { value: 'user', label: 'User' }
        ];
      }
      return field;
    });
  }
};
console.log('Model structure:', modelStructure);
const handleFormSubmit = (formData) => {
  console.log('Form data submitted:', formData);
};

onMounted(() => {
  getModelStructure();
});
</script>

<template>
  <div>
    <h1>Ajouter un Utilisateur</h1>
    <DynamicForm :inputs="modelStructure" @submit="handleFormSubmit" />
  </div>
</template>