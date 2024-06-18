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
const connect = async (newValue) => {
    try {
        response = await ky.get("http://localhost:8000/searchProduct", {
            searchParams: {
                search: newValue,
            },
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
    connect(newValue);
});

</script>

<template>
    <!-- search button -->
    <button @click="openSearch">
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="22" fill="none" viewBox="0 0 21 22">
            <path fill="#000"
                d="m19.533 21.5-5.766-5.767a7.348 7.348 0 0 1-2.332 1.35 8.244 8.244 0 0 1-2.835.484c-2.404 0-4.438-.834-6.103-2.5C.832 13.4 0 11.389 0 9.033 0 6.678.833 4.667 2.5 3 4.167 1.333 6.183.5 8.55.5s4.378.833 6.033 2.5c1.656 1.667 2.484 3.68 2.484 6.038A8.3 8.3 0 0 1 16.6 11.8a8.461 8.461 0 0 1-1.4 2.5l5.8 5.733-1.467 1.467ZM8.567 15.567c1.805 0 3.34-.64 4.604-1.917 1.264-1.278 1.896-2.817 1.896-4.617 0-1.8-.632-3.339-1.896-4.616C11.907 3.139 10.372 2.5 8.567 2.5c-1.824 0-3.375.639-4.652 1.917C2.638 5.694 2 7.233 2 9.033c0 1.8.638 3.34 1.915 4.617 1.277 1.278 2.828 1.917 4.652 1.917Z" />
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
            <SearchResult v-for="(product, index) in response.data" :key="index" :product="product"
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
