<script setup>
import { ref, onMounted } from 'vue';
import ky from 'ky';
import ProductCard from '../components/Cards/ProductCard.vue';
import ProgressBar from '../components/ProgressBar.vue';
import FilterProducts from '../components/FilterProducts.vue';

let products = ref([]);
let currentPage = ref(1);
let totalPages = ref(0);
let productsPerPage = ref(10);
let success = ref(false);
let order = ref('');


// get all products API
const getProducts = async (page) => {
    try {
        const data = await ky.get("http://localhost:8000/products", {
            searchParams: {
                page: page,
                order: order.value,
            },
        }).json();
        products.value = data.data.products;
        totalPages.value = data.data.totalPages;
        success.value = data.success;
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getProducts(productsPerPage.value);
});

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        productsPerPage.value = productsPerPage.value + 10;
        currentPage.value++;
        getProducts(productsPerPage.value);
    }
};

const orderSelected = (newValue) => {
    order.value = newValue;
};

</script>

<template>
    <section v-if="success && products.length !== 0" class="flex flex-col mb-2">
        <!-- composant filtre ici -->
        <FilterProducts @order="orderSelected" />
        <img src="/bannerproduct.webp" alt="bannière de la page produits" class="" />
        <div class="grid grid-cols-2">
            <!-- <ProductCard v-for="(product, index) in products" :key="index"
                :productName="product.name" :productDesc="product.description" :productPrice=""
                :productCategory="product.category[0].name" /> -->
            <ProductCard v-for="(product, index) in products" :key="index" :product="product" />
        </div>
        <div class="flex flex-col items-center gap-2 mt-4">
            <span class="italic">Page {{ currentPage }} sur {{ totalPages }}</span>
            <ProgressBar :percentage="currentPage" :max="totalPages" />
            <button v-if="currentPage !== totalPages" @click="goToNextPage"
                class="bg-black text-white font-bold p-2 w-32 h-12 rounded">
                Charger plus
            </button>
        </div>
    </section>
    <section v-else>
        <span class=" text-custom-gray italic">Aucun produit disponible</span>
    </section>
</template>