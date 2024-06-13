<script setup>
defineProps({
    productImg: String,
    productName: String,
    productDesc: String,
    productPrice: Number,
    productCategory: String,
});
</script>

<template>
    <div class="flex flex-col">
        <img :src="productImg" alt="`image du produit ${{ productName }}`"/>
    </div>
</template>