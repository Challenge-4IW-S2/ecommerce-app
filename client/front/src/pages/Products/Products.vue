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
let category = ref([]);
let name = ref([]);
let priceMin = ref(0);
let priceMax = ref(0);


// get all products API
const getProducts = async (page, orderBy, categories, valueMin, valueMax, names) => {
    try {
        let searchParams = new URLSearchParams({
            page: page,
            order: orderBy,
            categories: categories,
            valueMin: valueMin,
            valueMax: valueMax,
            names: names,
        });
        if (Array.isArray(categories)) {
            categories.forEach(category => {
                searchParams.append('categories', category);
            });
        }
        if (Array.isArray(names)) {
            names.forEach(name => {
                searchParams.append('names', name);
            });
        }
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProducts`, {
            searchParams: searchParams,
        }).json().then((response) => {
            products.value = response.productsResults;
            totalPages.value = response.totalPagesResults;
        });
    } catch (error) {
        console.error(error);
    }
}

onMounted(() => {
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
});

const goToNextPage = () => {
    if (currentPage.value < totalPages.value) {
        productsPerPage.value = productsPerPage.value + 10;
        currentPage.value++;
        getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
    }
};

const orderSelected = (newValue) => {
    order.value = newValue;
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
};

const categoriesSelected = (categories) => {
    category.value = categories;
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
};

const priceMinSelected = (newPriceMin) => {
    priceMin.value = newPriceMin;
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
};

const priceMaxSelected = (newPriceMax) => {
    priceMax.value = newPriceMax;
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
};

const namesSelected = (name) => {
    name.value = name;
    getProducts(productsPerPage.value, order.value, category.value, priceMin.value, priceMax.value, name.value);
};
</script>

<template>
    <section class="flex flex-col mb-2">
        <FilterProducts @order="orderSelected" @categories="categoriesSelected" @priceMin="priceMinSelected"
            @priceMax="priceMaxSelected" @names="namesSelected"/>
        <!-- <img src="/bannerproduct.webp" alt="bannière de la page produits" class="" /> -->
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