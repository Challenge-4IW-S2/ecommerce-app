<script setup>
import { ref } from 'vue';
import OpenCart from './OpenCart.vue';
const isCartOpen = ref(false);
const openCart = () => {
    isCartOpen.value = !isCartOpen.value;
}

const productNumber = ref(0);
</script>

<template>
    <div v-if="isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

    <button class="uppercase text-sm" @click="openCart">
        Panier ({{ productNumber }})
    </button>
    <div v-if="isCartOpen">
        <OpenCart :closeFunction=openCart />
    </div>

</template>