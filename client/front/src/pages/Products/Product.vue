<script setup>
import { ref, onMounted, computed } from 'vue';
import z from 'zod';
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

const addProductToBag = () => {
    console.log('Product added to bag:', product.value._id);
};

onMounted(getProduct);
</script>

<template>
    <section class="p-4 flex gap-4">
        <CardDescription v-if="product && product.category && product.category.length > 0"
            :productCategory="product.category[0].name" />

        <div v-if="product" class="flex flex-col text-left border border-[#E4E4E4] rounded p-6 w-[328px]">
            <form class="" @submit.prevent="addProductToBag">
                <div class="mt-6">
                    <a href="#">
                        <p v-if="product && product.category && product.category.length > 0" class="mb-2 text-left tracking-tight text-black">{{ product.category[0].name }}</p>
                    </a>
                </div>
                <h2 class="mb2 text-2xl font-semibold text-black"> {{ product.name }}</h2>
                <p class="mb-2 text-left tracking-tight text-black">{{ product.price_ttc }} EUR</p>
                <p class="my-4 font-normal text-black py-3">
                    {{ product.description }}
                </p>
                <button type="submit"
                    class="mt-10 flex w-full bg-principal items-center justify-center text-white rounded-md border border-transparent px-8 py-3 text-base font-medium">
                    Ajouter
                </button>
            </form>
        </div>
    </section>
</template>