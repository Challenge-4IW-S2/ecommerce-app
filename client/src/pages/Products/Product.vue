<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ky from 'ky';

const route = useRoute();
const id = computed(() => route.params.id);
const product = ref([]);

// get product by id
const getProduct = async () => {
    try {
        const response = await ky.get(`http://localhost:8000/product/${id.value}`).json();
        console.log(response);
        if (response) {
            product.value = response;
        } else {
            console.log('No data found');
        }
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
};
getProduct();
console.log(id.value);
</script>

<template></template>