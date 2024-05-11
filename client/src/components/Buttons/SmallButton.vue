<script setup>
    defineProps({
        text: String,
        bgColor: String,
        textColor: String,
        customStyle: String
    });
</script>

<template>
    <button :class="`bg-${bgColor} text-${textColor} font-bold p-2 w-32 h-10 rounded ${customStyle}`">
        {{ text }}
    </button>
</template>