<script setup>
const props =  defineProps({
    title: String,
    id: String,
    name: String,
    value: String,
  modelValue: Boolean // Utilisez modelValue pour v-model
});
const emit = defineEmits(['update:modelValue', 'change']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked);
  emit('change', { name: props.name, activated: event.target.checked });
};
</script>

<template>
      <div class="flex">
        <div class="flex items-center h-5">
          <input
              :id="id"
              :name="name"
              :value="value"
              :checked="modelValue"
              @change="handleChange"
              type="checkbox"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div class="ms-2 text-sm">
          <label :for="id" class="font-medium text-gray-900 dark:text-gray-300">{{ title }}</label>
        </div>
      </div>

</template>