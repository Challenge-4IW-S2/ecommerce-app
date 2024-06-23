<script setup>
import {computed} from "vue";

const props = defineProps({
  id: String,          // L'identifiant unique du champ de sélection
  title: String,       // Le titre ou le label du champ
  options: {           // Les options à afficher dans le select
    type: Array,
    default: () => []
  },
  modelValue: [String, Number]  // La valeur sélectionnée
});
const emit = defineEmits(['update:modelValue']);
const internalModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
console.log(props.options);
</script>

<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-bold uppercase text-gray-900 dark:text-dark">
      {{ title }}
    </label>
    <div class="w-full relative">
      <select
          :id="id"
          :value="modelValue"
          v-model="internalModelValue"
          @change="$emit('update:modelValue', $event.target.value)"
      class="border pl-3 py-2 placeholder:text:base border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>
<style scoped>

</style>