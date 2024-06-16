<script lang="ts" setup>
defineProps({
    productImg: String,
    productName: String,
    productPrice: Number,
    productCategory: String,
});
</script>

<template>
    <div class="flex">
        <img :src="productImg" alt="`image du produit ${{ productName }}`" />
        <div class="flex flex-col gap-2">
            <p class="text-custom-gray">{{ productName }}</p>
            <p class="text-principal">{{ productPrice }} EUR</p>
            <p class="text-custom-gray">{{ productCategory }}</p>
        </div>
    </div>
</template>