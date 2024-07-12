<script setup>
    defineProps({
        customStyle: String,
    })
</script>

<template>
    <select :class="`p-3 border border-custom-black h-12 ${customStyle}`">
        <option v-for="n in 10" :value="n" :key="n">{{ n }}</option>
    </select>
</template>