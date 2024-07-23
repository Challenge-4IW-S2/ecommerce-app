<script lang="ts" setup>
import { RouterLink } from 'vue-router';
defineProps({
    product: Object,
});
</script>

<template>

    <RouterLink class="flex" :to="`/product/${product.slug}/`">
        <img :src="product.pictures[0]?.url" :alt="`image du produit ${product.name}`" />
        <div class="flex flex-col gap-2">
            <p class="text-custom-gray">{{ product.name }}</p>
            <p class="text-principal">{{ product.price_ttc }} EUR</p>
            <p class="text-custom-gray">{{ product.category[0].name }}</p>
        </div>
    </RouterLink>
</template>