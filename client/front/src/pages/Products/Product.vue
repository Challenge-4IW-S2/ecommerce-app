<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ky from 'ky';
import PictureCarousel from '../../components/Carousel/PictureCarousel.vue';
import Button from '../../components/Buttons/Button.vue';
import ProductDetails from '../../components/ProductDetails.vue';
import CardDescription from '../../components/CardDescription.vue';

const route = useRoute();
const slug = computed(() => route.params.slug);
let product = ref(null);

const getProduct = async () => {
    try {
        const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProduct/${slug.value}`).json();
        if (response.data && response.data.length > 0) {
            product.value = response.data[0];
        } else {
            console.log('No product found');
        }
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
};

onMounted(getProduct);
</script>

<template>
   {{ product }}
    <CardDescription :product="product"/>
    <!-- <section v-if="product" class="flex flex-col px-2">
        <PictureCarousel :pictures="product.pictures" :name="product.name" />
        <span class="font-semibold text-sm mb-3"> {{ product.name }}</span>
        <span class="font-light text-xs mb-3"> à partir de {{ product.price_ttc }} EUR</span>
        <Button text="Ajouter" />
    </section>
    <section v-for="(details, index) in ProductDetailsArray" class="mt-2">
        <ProductDetails :buttonTitle="details.buttonTitle" :descriptionToggle="details.descriptionToggle" />
    </section> -->
</template>