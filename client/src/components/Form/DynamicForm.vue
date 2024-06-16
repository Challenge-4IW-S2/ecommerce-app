<script setup>
import Input from "../Inputs/Input.vue";
const props = defineProps({
  inputs: {
    Array,
    default: () => []
  },
});
const emit = defineEmits(['submit']);
const handleSubmit = (event) => {
  event.preventDefault();
  emit('submit', formData.value);
};

</script>
<template>
  <form @submit="handleSubmit">
    <div class="grid gap-6 mb-6 md:grid-cols-2">
     <div v-for="input in inputs" >
        <div>{{ input }}</div>
       <component
           :is="input.type === 'select' ? 'Select' : 'Input'"
           v-bind="input"
           v-model="input.value"
       />
     </div>
    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
  </form>
</template>
<style scoped>
</style>