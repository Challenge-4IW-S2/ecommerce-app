<script setup>
import {ref, computed, watch} from "vue";

const props = defineProps({
  id: String,
  title: {
    type: String,
    default: 'Titre de mon input'
  },
  placeholder: String,
  type: {
    validator: (value) => ['text', 'email', 'password', 'number', 'date', 'datetime-local', 'month', 'search', 'tel', 'time', 'url', 'week', 'color'].includes(value),
    default: 'text'
  },
  error: String,
  option: String,
  modelValue: String,
  disabled: Boolean

})

let dynamicType = ref(props.type);
let inputValue = ref(props.modelValue);

function changeVisibility() {
  dynamicType.value = dynamicType.value === 'password'
      ? 'text'
      : 'password';
}
const emit = defineEmits(['update:modelValue']);
const internalModelValue = computed({
  get: () => inputValue.value,
  set: (value) => {
    inputValue.value = value;
    emit('update:modelValue', value)
  }
});

</script>

<template>
  <div>
    <label :for="id" class="block mb-2 text-sm font-bold uppercase text-gray-900 dark:text-black">
      {{ title }}
    </label>
    <div class="w-full relative">
      <input
          :id="id"
          :type="dynamicType"
          :placeholder="placeholder"
          :option="option"
          v-model="internalModelValue"
          :disabled="disabled"
          class="border pl-3 py-2 placeholder:text:base border-black text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
      </input>
      <span v-if="type === 'password'" class="z-20 absolute top-2/4 right-2 pl-4 pr-2 -translate-y-2/4 text-xs cursor-pointer bg-white"
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
