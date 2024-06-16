<script setup>
import {ref} from "vue";
import { computed} from 'vue';

const props = defineProps({
  id: String,
  title: {
    type: String,
    default: 'Titre de mon input'
  },
  placeholder: String,
  type: {
    type: String,
    validator: (value) => ['text', 'email', 'password', 'number', 'date', 'datetime-local', 'month', 'search', 'tel', 'time', 'url', 'week', 'color'].includes(value),
    default: 'text'
  },
  error: String,
  option: String,
})

let dynamicType = ref(props.type);

const value = defineModel('value');

function changeVisibility() {
  dynamicType.value = dynamicType.value === 'password'
      ? 'text'
      : 'password';
}

const emit = defineEmits(['update:modelValue']);
const internalModelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

console.log(internalModelValue)

</script>

<template>
  <div >
    <label :for="id" class="block mb-2 text-sm font-bold uppercase text-gray-900 dark:text-white">
      {{ title }}
    </label>
    <div class="w-full relative">
      <input
          :id="id"
          :type="dynamicType"
          :placeholder="placeholder"
          :option="option"
          v-model="internalModelValue"
          class="border pl-3 py-2 placeholder:text:base  border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      </input>
      <span v-if="type === 'password'" class="absolute top-2/4 right-4 -translate-y-2/4 text-xs cursor-pointer"
            @click="changeVisibility">
        {{
          dynamicType === 'password' ? 'AFFICHER' : 'MASQUER'
        }}
      </span>
    </div>
  </div>
</template>

<style scoped>

</style>
//v-model="value"
