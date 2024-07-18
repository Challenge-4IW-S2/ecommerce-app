<script setup>
import ky from 'ky';
import { ref, watch, defineEmits, } from 'vue';

// filter by 
const isFiltersOpen = ref(false);
const openFilters = () => {
    isFiltersOpen.value = !isFiltersOpen.value;
}
// -> categories
let categories = ref([]);
let categoriesSelected = ref([]);
const getCategories = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getCategories`).json().then((response) => {
            categories.value = response;
        });
    } catch (error) {
        console.error(error);
    }
}
getCategories();

// -> prices
let priceMin = ref(0);
let priceMax = ref(0);
const getPrices = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getMinMaxPrice`).json().then((response) => {
            priceMin.value = response[0].min;
            priceMax.value = response[0].max;
        });

    } catch (error) {
        console.error(error);
    }
}
getPrices();

// -> products name
let productsNames = ref([]);
let productsNamesSelected = ref([]);
const getProductsNames = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProductsNames`).json().then((response) => {
            productsNames.value = response;
        });
    } catch (error) {
        console.error(error);
    }
}
getProductsNames();
// order by
const OrdersValue = [
    { id: 0, name: 'Pertinence', value: 'relevance' },
    { id: 1, name: 'Prix décroissant', value: 'price_desc' },
    { id: 2, name: 'Prix croissant', value: 'price_asc' },
    { id: 3, name: 'Plus récent', value: 'date_desc' },
    { id: 4, name: 'Plus ancien', value: 'date_asc' },
];
const selectedOrder = ref('relevance')

// infos send to parent component
const emit = defineEmits(['categories', 'order', 'priceMin', 'priceMax', 'names']);
// infos on order by
watch(selectedOrder, (newValue) => {
    emit('order', newValue);
    selectedOrder.value = newValue;
});
// infos on categories
watch(categoriesSelected, () => {
    emit('categories', categoriesSelected.value);
});
// infos on prices
watch(priceMin, () => {
    emit('priceMin', priceMin.value);
});
watch(priceMax, () => {
    emit('priceMax', priceMax.value);
});
// infos on names
watch(productsNamesSelected, () => {
    emit('names', productsNamesSelected.value);
});
</script>

<template>
    <div class="py-4 px-5 flex justify-between">
        <button @click="openFilters" class="">Filtrer les résultats</button>
        <div class="flex gap-1">
            Trier par :
            <select v-model="selectedOrder" class="appearance-none">
                <option v-for="order in OrdersValue" :key="order.id" :value="order.value">
                    {{ order.name }}
                </option>
            </select>
        </div>
    </div>
    <div v-if="isFiltersOpen" class="flex bg-white border border-black p-2">
        <div class="flex flex-col">
            <span class="font-bold">Catégories</span>
            <div class="flex items-center gap-1" v-for="category in categories">
                <input type="checkbox" :id="category.name" :name="category.name" :value="category.name"
                    v-model="categoriesSelected">
                <label :for="category.name">{{ category.name }}</label>
            </div>
        </div>
        <div class="flex flex-col">
            <span class="font-bold">Prix</span>
            <input type="number" v-model="priceMin" class="w-20" />
            <input type="number" v-model="priceMax" class="w-20" />
        </div>
        <div class="flex flex-col">
            <span class="font-bold">Nom du produit</span>
            <div class="flex items-center gap-1" v-for="product in productsNames" :key="product.name">
                <input type="checkbox" :id="product.name" :name="product.name" :value="product.name"
                    v-model="productsNamesSelected">
                <label :for="product.name">{{ product.name }}</label>
            </div>
        </div>
    </div>
</template>