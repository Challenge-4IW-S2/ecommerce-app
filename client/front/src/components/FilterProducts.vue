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

// --> function for products name
let productsNames = ref([]);
let productsNamesSelected = ref([]);
const isNamesOpen = ref(false);
const openNames = () => {
    isNamesOpen.value = !isNamesOpen.value;
}
const getProductsNames = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProductsNames`).json().then((response) => {
            productsNames.value = response;
        });
    } catch (error) {
        console.error(error);
    }
}

// function for sizes

// function for colors


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

onBeforeMount(() => {
    getCategories();
    getPrices();
    getProductsNames();
})

const deleteFilters = () => {
    categoriesSelected.value = [];
    productsNamesSelected.value = [];
    getPrices();
}


// infos send to parent component
const emit = defineEmits(['categories', 'order', 'priceMin', 'priceMax', 'names']);
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
// infos on names
watch(productsNamesSelected, () => {
    emit('names', productsNamesSelected.value);
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
            <select v-model="selectedOrder" class="appearance-none border-none p-0" style="background-image: none; padding: 0;">
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
                <span class="flex items-center gap-1">
                    De <input type="number" v-model="priceMin" class="w-14" /> EUR
                </span>
                <span class="flex items-center gap-1">
                    À <input type="number" v-model="priceMax" class="w-14" /> EUR
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
        <!-- section taille -->
        <!-- <section class="flex flex-col w-full">
            <button class="">Tailles</button>
        </section> -->
        <!-- section couleur -->
        <!-- <section class="flex flex-col w-full">
            <button class="">Couleurs</button>
        </section> -->
        <!-- section nom -->
        <button @click="openNames" class="self-start flex justify-between w-full">
            <span>Nom du produit</span>
            <svg v-if="isNamesOpen === false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                viewBox="0 0 24 24">
                <path fill="#000"
                    d="M21.862 11.845a.5.5 0 1 0-.724-.69L12.5 20.248V2.5a.5.5 0 0 0-1 0v17.748l-8.637-9.092a.5.5 0 1 0-.726.688l9.5 10a.501.501 0 0 0 .726 0l9.5-10-.001.001Z" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 256 256">
                <path fill="#000"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>
        <section v-if="isNamesOpen" class="flex flex-col w-full border-black border-y border-x-0">
            <div class="flex items-center gap-1" v-for="product in productsNames" :key="product.name">
                <input type="checkbox" :id="product.name" :name="product.name" :value="product.name"
                    v-model="productsNamesSelected">
                <label :for="product.name">{{ product.name }}</label>
            </div>
        </section>

        <div class="grow"></div>
        <Button @click="deleteFilters" text="Effacer les filtres" />
    </div>
</template>