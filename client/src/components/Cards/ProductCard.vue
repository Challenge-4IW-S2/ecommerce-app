<script setup>
import { ref } from 'vue';
defineProps({
    product: Object,
});

const isModalOpen = ref(false);
const openModal = () => {
    isModalOpen.value = !isModalOpen.value;
}
</script>

<template>
    <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
    <div class="flex flex-col relative z-0">
        <img :src="product.pictures[0].url" :alt="`image du produit ${product.name}`">
        <button @click="openModal"
            class="bg-black h-8 w-8 rounded-full flex items-center justify-center absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path stroke="#fff" d="M.335 6.5h13.333M7.505.335v13.334" />
            </svg>
        </button>
    </div>
    <div v-if="isModalOpen" class="fixed inset-0 z-20 flex flex-col justify-center">
        <div class="bg-white pb-10 shadow-lg flex flex-col font-light mx-2">
            <button @click="openModal" class="self-end mt-5 mr-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256">
                    <path fill="black"
                        d="M202.83 197.17a4 4 0 0 1-5.66 5.66L128 133.66l-69.17 69.17a4 4 0 0 1-5.66-5.66L122.34 128L53.17 58.83a4 4 0 0 1 5.66-5.66L128 122.34l69.17-69.17a4 4 0 1 1 5.66 5.66L133.66 128Z" />
                </svg>
            </button>
            <!-- name and price -->
            <div class="pl-6 flex flex-col justify-between mb-5">
                <span>{{ product.name }}</span>
                <span>{{ product.price_ttc }} EUR</span>
            </div>
            <!-- pictures -->
            <div class="flex gap-2 border-y border-black">
                <img v-for="(picture, index) in product.pictures" :key="index" :src="picture.url"
                    :alt="`image du produit ${product.name}`">
            </div>
            <!-- sizes -->
            <span class="pl-6 my-10">Sélectionner la longueur</span>

        </div>
    </div>
</template>