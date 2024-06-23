<script setup>
import Input from "../Inputs/Input.vue";
import Select from "../Inputs/Select.vue";
import {computed, defineEmits, onMounted, reactive, ref, watch} from "vue";
import Button from "../Buttons/Button.vue";
import RadioInput from "../Inputs/RadioInput.vue";
const emit = defineEmits(['submit', 'delete']);
const formData = reactive({});
const props = defineProps({
  inputs: {
    Array,
    default: () => []
  },
});
const initializeFormData = () => {
  props.inputs.forEach(input => {
    formData[input.name] = input.value || '';
  });
};
initializeFormData();
watch(
    () => props.inputs,
    (newInputs) => {
      initializeFormData();
    },
    { immediate: true, deep: true }
);

const filteredInputs = computed(() => {
  //if(PAGE === 'add'){
  return props.inputs.filter(input => input.type !== 'DATE'
      && input.name !== 'id'
      && input.name !== 'is_verified');
  //}else{
  //}
});
const handleSubmit = (event) => {
  event.preventDefault();
  emit('submit', formData);
};
// Gérer la suppression de l'élément
const handleDelete = (event) => {
  event.preventDefault();
  emit('delete', formData.id);
  console.log(formData)
}
const filterProps = (input) => {
  console.log(input.name)
  let props = {
    id: input.name,
    title: input.name,
    modelValue: formData[input.name],
  };
  if (input.is === 'select') {
    //delete input.type;  Remove the type property
    props.options = input.options;
  } else if (input.type === 'checkbox') {
    props.checked = formData[input.name];
  } else {
    props.type = input.type;
    props.placeholder = input.name;
  }
  return props;
};
</script>
<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
     <div v-for="input in filteredInputs" :key="input.name" >
       <component
           :is="input.is === 'select' ? Select : input.type === 'checkbox' ? RadioInput : Input"
           v-bind="filterProps(input)"
           v-model="formData[input.name]"
       />
     </div>
    </div>
    <div class="flex justify-end">
      <Button text="Ajouter" />
      <Button v-if="formData.id" text="Supprimer" @click="handleDelete" class="ml-2 bg-red-500 hover:bg-red-600 text-white" />
    </div>
  </form>
</template>
<style scoped>
</style>