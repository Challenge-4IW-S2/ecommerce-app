<script setup>
import { ref, watch } from 'vue';
import ky from 'ky';
import { useSearchHistoryStore } from '../../store/searchHistoryStore';

import SearchInput from './SearchInput.vue';
import SearchResult from './SearchResult.vue';
import ButtonDelete from '../Buttons/ButtonDelete.vue';

const searchHistoryStore = useSearchHistoryStore();
const searchHistory = searchHistoryStore.searchHistory;
let response = ref([]);
const isSearchOpen = ref(false);
const search = ref('');
const openSearch = () => {
    isSearchOpen.value = !isSearchOpen.value;
    search.value = '';
}

// search product API
const searchProducts = async (newValue) => {
    try {
        response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/searchProduct`, {
            searchParams: {
                search: newValue,
            },
          credentials: "include"
        }).json();
    } catch (error) {
        console.error(error);
    }
}

const addToSearchHistory = () => {
    searchHistoryStore.addSearchHistory(search.value);
}
const deleteSearchHistory = () => {
    searchHistoryStore.deleteSearchHistory();
}

const setSearchValue = (value) => {
    search.value = value;
}
watch(search, (newValue) => {
    searchProducts(newValue);
});

</script>

<template>
    <div v-if="isSearchOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

    <!-- search button -->
    <button @click="openSearch">
        <svg class="cursor-pointer" width="16" height="13" viewBox="0 0 15 12" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M7.8137 8.32688C6.99278 9.2873 5.80614 9.89066 4.48642 9.89066C2.00864 9.89066 0 7.76379 0 5.14016C0 2.51652 2.00864 0.389648 4.48642 0.389648C6.96421 0.389648 8.97285 2.51652 8.97285 5.14016C8.97285 5.99809 8.75806 6.80291 8.38232 7.4976L14.0257 10.4854L13.5987 11.3896L7.8137 8.32688ZM7.97285 5.14016C7.97285 7.26616 6.3588 8.89066 4.48642 8.89066C2.61404 8.89066 1 7.26616 1 5.14016C1 3.01415 2.61404 1.38965 4.48642 1.38965C6.3588 1.38965 7.97285 3.01415 7.97285 5.14016Z"
                fill="black" />
        </svg>
    </button>

    <div v-if="isSearchOpen"
        class="absolute flex flex-col bg-white w-full top-0 left-0 p-4 border-b-2 border-principal gap-2 z-50">
        <!-- close button -->
        <button @click="openSearch" class="self-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" viewBox="0 0 256 256">
                <path fill="black"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>
        <!-- input search -->
        <SearchInput v-model="search" />
        <div v-if="search !== ''" class="flex flex-col">
            <!-- Affichage des résults -->
            <SearchResult v-for="(product, index) in response" :key="index" :product="product"
                @click="addToSearchHistory" />
        </div>
        <!-- search History -->
        <div class="" v-if="searchHistory.lenght !== 0 && search == ''">
            <div class="flex justify-between">
                <h2 class="text-xl font-bold">Historique de recherche</h2>
                <ButtonDelete @click="deleteSearchHistory" />
            </div>
            <ul class="flex flex-col gap-2">
                <li v-for="(search, index) in searchHistory" :key="index" class="" @click="setSearchValue(search)">
                    {{ search }}
                </li>
            </ul>
        </div>
    </div>
</template>
