<script setup>
defineProps({
    pictures: Array,
    name: String,
});

</script>

<template>
    <div class="flex flex-nowrap overflow-x-auto">
        <img v-for="(picture, index) in pictures" :key="index" :src="`../public/${picture.url}`"
            :alt="`image du produit ${name}`">
    </div>
</template>