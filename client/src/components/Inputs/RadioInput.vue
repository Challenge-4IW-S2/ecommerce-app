<script setup>
defineProps({
    label: String,
    id: String,
    name: String,
    value: String,
    // required: Boolean,
    // modelValue: String,
    // updateModelValue: Function
});
</script>

<template>
    <div class="flex pl-1 gap-1">
        <input type="radio" :id="id" :name="name" :value="value" />
        <label class="font-semibold text-xs" :for="id">{{ label }}</label>
    </div>
</template>