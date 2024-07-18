<script setup>
defineProps({
    title: String,
    id: String,
    name: String,
    value: String,
  modelValue: Boolean // Utilisez modelValue pour v-model
});
const emit = defineEmits(['update:modelValue']);

const handleChange = (event) => {
  emit('update:modelValue', event.target.checked);
};
</script>

<template>
    <div class="flex pl-1 gap-1">
        <input type="checkbox" :id="id" :name="name" :value="value" :checked="modelValue" @change="handleChange"/>
        <label class="font-semibold text-xs dark:text-black" :for="id">{{ title }}</label>
    </div>
</template>