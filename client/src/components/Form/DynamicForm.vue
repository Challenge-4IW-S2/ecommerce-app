<script setup>
import Input from "../Inputs/Input.vue";
import Select from "../Inputs/Select.vue";
import {computed, defineEmits, onMounted, ref} from "vue";
import Button from "../Buttons/Button.vue";

const props = defineProps({
  inputs: {
    Array,
    default: () => []
  },
});
const emit = defineEmits(['submit']);
const formData = ref({ value: {} });
onMounted(() => {
  props.inputs.forEach(input => {
    formData.value[input.name] = '';
  });
});
const vInput = { // Custom directive definition
  mounted(el, { value }) {
    console.log(el, value)
    el.addEventListener("input", (event) => {
      value(event.target.value);
      console.log(event.target.value);
    });
  },
};

const filteredInputs = computed(() => {
  //if(PAGE === 'add'){
  return props.inputs.filter(input => input.type !== 'DATE' && input.name !== 'id' && input.name !== 'is_verified');
  //}else{
  //}
});
const handleSubmit = (event) => {
  event.preventDefault();
  emit('submit', formData.value);
};
const filterProps = (input) => {
  if (input.is === 'select') {
      delete input.type;  // Remove the type property
      return {
        id: input.name,
        title: input.name,
        options: input.options,
        vInput: formData.value[input.name],
      }
    } else {
    return {
        id: input.name,
        title: input.name,
        type: input.type,
        placeholder: input.name,
        //error: input.error,
      vInput: formData.value[input.name],
    }
  }
};
  console.log(formData.value)
</script>
<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
     <div v-for="input in filteredInputs" :key="input.name" >
       <component
           :is="input.is === 'select' ? Select : Input"
           v-bind="filterProps(input)"
           vInput="formData.value[input.name]"
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