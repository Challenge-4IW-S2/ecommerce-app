<script setup>
import {computed, ref} from "vue";
import Input from "./Input.vue";

const props = defineProps({
  id: String,          // L'identifiant unique du champ de sélection
  title: String,       // Le titre ou le label du champ
  options: {           // Les options à afficher dans le select
    type: Array,
    default: () => []
  },
  modelValue: [String, Number,Array]  // La valeur sélectionnée
});
const selectedValue = ref(props.modelValue);
const emit = defineEmits(['update:modelValue']);
const internalModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});
</script>

<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-bold uppercase text-gray-900 dark:text-dark">
      {{ id }}
    </label>
    <div class="w-full relative">
      <select
          :id="id"
          :value="modelValue"
          v-model="internalModelValue"
          @change="$emit('update:modelValue', $event.target.value)"
          class="border p-3.5  pl-3 py-2 placeholder:text:base border-black text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
      >
        <option value="" disabled selected>Choose an option</option>
        <option v-for="option in options" :key="option.label" :value="option.label">
          {{ option.label }}
        </option>
      </select>
    </div>

  </div>
</template>
<style scoped>

</style>