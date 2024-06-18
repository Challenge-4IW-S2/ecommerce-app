<script setup>
import Input from "../Inputs/Input.vue";
import Select from "../Inputs/Select.vue";
import {computed, defineEmits, onMounted, reactive, ref} from "vue";
import Button from "../Buttons/Button.vue";

const props = defineProps({
  inputs: {
    Array,
    default: () => []
  },
});
const emit = defineEmits(['submit']);
const formData = reactive({});


const filteredInputs = computed(() => {
  //if(PAGE === 'add'){
  return props.inputs.filter(input => input.type !== 'DATE' && input.name !== 'id' && input.name !== 'is_verified');
  //}else{
  //}
});
const handleSubmit = (event) => {
  event.preventDefault();
  emit('submit', formData);
};
const filterProps = (input) => {
  if (input.is === 'select') {
      delete input.type;  // Remove the type property
      return {
        id: input.name,
        title: input.name,
        options: input.options,
        vInput: formData[input.name],
      }
    } else {
    return {
        id: input.name,
        title: input.name,
        type: input.type,
        placeholder: input.name,
        //error: input.error,
      vInput: formData[input.name],
    }
  }
};
</script>
<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
     <div v-for="input in filteredInputs" :key="input.name" >
       <component
           :is="input.is === 'select' ? Select : Input"
           v-bind="filterProps(input)"
           v-model="formData[input.name]"
       />
     </div>
    </div>
    <div class="flex justify-end">
      <Button text="Ajouter" />
    </div>
  </form>
</template>
<style scoped>
</style>