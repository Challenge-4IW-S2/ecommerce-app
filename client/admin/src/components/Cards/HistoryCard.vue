<script setup>
defineProps({
    imgName: String,
    status: String,
    date: String,
    nbProducts: Number
})
</script>

<template>
    <div class="flex flex-col">
        <img class="rounded shadow-lg" :src="`./public/${imgName}`" :alt="`Image du produit ${productName}`" width="95"
            height="100" />
        <span class="font-medium text-sm">{{ status }}</span>
        <span class="font-extralight text-xs text-custom-gray">{{ date }}</span>
        <span class="font-extralight text-xs text-custom-gray">{{ nbProducts }} articles</span>
    </div>
</template>