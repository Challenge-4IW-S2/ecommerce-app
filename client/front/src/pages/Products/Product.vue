<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ky from 'ky';
import CardDescription from '../../components/CardDescription.vue';

const route = useRoute();
const slug = computed(() => route.params.slug);
let product = ref([]);

const getProduct = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProduct/${slug.value}`).json().then((response) => {
            product.value = response[0];
        });
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
};

onMounted(getProduct);
</script>


<template>
    <CardDescription :product="product" />

</template>