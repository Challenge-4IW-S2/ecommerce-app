<script lang="ts" setup>
    defineProps({
        type: String,
        placeholder: String,
        required: Boolean,
        modelValue: String,
    });
</script>

<template>
    <input 
        :type="type" 
        :placeholder="placeholder" 
        :required="required"
        class="py-3 pl-3 border border-custom-black text-custom-red"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
    />
</template>