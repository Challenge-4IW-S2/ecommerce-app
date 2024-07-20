<script setup>
import ky from 'ky';
import { ref, watch, defineEmits, onBeforeMount } from 'vue';
import Button from './Buttons/Button.vue';

const isFiltersOpen = ref(false);
const openFilters = () => {
    isFiltersOpen.value = !isFiltersOpen.value;
}

// filter by 
// --> function for categories
let categories = ref([]);
let categoriesSelected = ref([]);
const isCategoriesOpen = ref(false);
const openCategories = () => {
    isCategoriesOpen.value = !isCategoriesOpen.value;
}
const getCategories = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getCategories`).json().then((response) => {
            categories.value = response;
        });
    } catch (error) {
        console.error(error);
    }
}


// --> function for prices
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

// --> function for inStock
let inStockSelected = ref([]);
// --> pour tester la checkbox
console.log(inStockSelected);

// order by
const OrdersValue = [
    { id: 0, name: 'Pertinence', value: 'relevance' },
    { id: 1, name: 'Prix décroissant', value: 'price_desc' },
    { id: 2, name: 'Prix croissant', value: 'price_asc' },
    { id: 3, name: 'Plus récent', value: 'date_desc' },
    { id: 4, name: 'Plus ancien', value: 'date_asc' },
];
const selectedOrder = ref('relevance')

onBeforeMount(() => {
    getCategories();
    getPrices();
})

const deleteFilters = () => {
    categoriesSelected.value = [];
    getPrices();
}


// infos send to parent component
const emit = defineEmits(['categories', 'order', 'priceMin', 'priceMax']);
//  infos on order by
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
</script>

<template>
    <div v-if="isFiltersOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

    <div class="py-4 px-5 flex justify-between items-center">
        <button @click="openFilters" class="">
            Filtrer les résultats
        </button>
        <div class="flex gap-1 items-center">
            Trier par :
            <select v-model="selectedOrder" class="appearance-none border-none p-0"
                style="background-image: none; padding: 0;">
                <option v-for="order in OrdersValue" :key="order.id" :value="order.value">
                    {{ order.name }}
                </option>
            </select>
        </div>
    </div>
    <div v-if="isFiltersOpen"
        class="p-8 bg-white flex flex-col absolute top-0 left-0 w-96 h-lvh text-black text-xl z-10 gap-5 ">
        <button @click="openFilters" class="self-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                <path fill="black"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>

        <!-- section gamme de prix -->
        <section class="flex flex-col items-center w-full">
            <span class="mb-2">Gamme de prix</span>
            <div class=" w-full flex justify-between">
                <span class="flex justify-center items-center gap-1">
                    De <input type="number" v-model="priceMin" class="w-10 p-0 border-none" /> EUR
                </span>
                <span class="flex items-center gap-1">
                    À <input type="number" v-model="priceMax" class="w-10 p-0 border-none" /> EUR
                </span>
            </div>
        </section>
        <!-- section catégorie -->
        <button @click="openCategories" class="self-start flex justify-between w-full">
            <span>Catégories</span>
            <svg v-if="isCategoriesOpen === false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path fill="#000"
                    d="M21.862 11.845a.5.5 0 1 0-.724-.69L12.5 20.248V2.5a.5.5 0 0 0-1 0v17.748l-8.637-9.092a.5.5 0 1 0-.726.688l9.5 10a.501.501 0 0 0 .726 0l9.5-10-.001.001Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                <path fill="#000"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>
        <section v-if="isCategoriesOpen" class="flex flex-col w-full border-black border-y border-x-0">
            <div class="flex items-center gap-1" v-for="category in categories">
                <input type="checkbox" :id="category.name" :name="category.name" :value="category.name"
                    v-model="categoriesSelected">
                <label :for="category.name">{{ category.name }}</label>
            </div>
        </section>
        <!-- section stock -->
        <section class="self-start flex items-center gap-2 w-full">
            <input type="checkbox" name="inStock" id="inStock" value="true" v-model="inStockSelected">
            <label for="inStock">Actuellement en stock</label>
        </section>
        <div class="grow"></div>
        <Button @click="deleteFilters" text="Effacer les filtres" />
    </div>
</template>