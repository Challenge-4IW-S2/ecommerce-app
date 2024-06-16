<script lang="ts" setup>
const props = defineProps({
    modelValue: String,
});
</script>

<template>
    <input type="text" placeholder="Rechercher un produit" class="py-3 pl-3 border border-custom-black text-principal"
        :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>