<script setup>
import { ref, onMounted } from 'vue';
import ky from 'ky';
import ProductCard from '../../components/Cards/ProductCard.vue';
import ProgressBar from '../../components/ProgressBar.vue';
import FilterProducts from '../../components/FilterProducts.vue';

let products = ref([]);
let currentPage = ref(1);
let totalPages = ref(0);
let productsPerPage = ref(10);
let order = ref('');


// get all products API
const getProducts = async (page, orderBy) => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
            searchParams: {
                page: page,
                order: orderBy,
            },
        }).json().then((response) => {
            const { products: productsResults, totalPages: totalPagesResults } = response;
            products.value = productsResults;
            totalPages.value = totalPagesResults;
        });
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getProducts(productsPerPage.value, order.value);
});

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        productsPerPage.value = productsPerPage.value + 10;
        currentPage.value++;
        getProducts(productsPerPage.value, order.value);
    }
};

const orderSelected = (newValue) => {
    order.value = newValue;
    getProducts(productsPerPage.value, order.value);
};

</script>

<template>
    <section class="flex flex-col mb-2">
        <FilterProducts @order="orderSelected" />
        <img src="/bannerproduct.webp" alt="bannière de la page produits" class="" />
        <article v-if="products.length !== 0" class="flex flex-col items-center gap-2">
            <div class="grid grid-cols-2">
                <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
            </div>
            <span class="italic">Page {{ currentPage }} sur {{ totalPages }}</span>
            <ProgressBar :percentage="currentPage" :max="totalPages" />
            <button v-if="currentPage !== totalPages" @click="goToNextPage"
                class="bg-black text-white font-bold p-2 w-32 h-12 rounded">
                Charger plus
            </button>
        </article>
        <article v-else class="flex flex-col items-center">
            <span class=" text-custom-gray italic">Aucun produit disponible</span>
        </article>
    </section>
</template>