<script setup>
defineProps({
    title: String,
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
        <input type="checkbox" :id="id" :name="name" :value="value" />
        <label class="font-semibold text-xs dark:text-black" :for="id">{{ title }}</label>
    </div>
</template>