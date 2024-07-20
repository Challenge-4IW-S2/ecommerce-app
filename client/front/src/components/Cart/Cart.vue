<script setup>
import { useCartStore } from '../../store/cart.js'
import OpenCart from "./OpenCart.vue"
import {computed} from "vue";

const cartStore = useCartStore()

const totalQuantity = computed(() => {
  return cartStore.items.reduce((total, item) => total + item.quantity, 0);
});

</script>

<template>
  <div v-if="cartStore.isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

  <button class="uppercase text-sm" @click="cartStore.toggleCart">
    Panier ({{ totalQuantity }})
  </button>
  <div v-if="cartStore.isCartOpen">
    <OpenCart :closeFunction="cartStore.toggleCart" />
  </div>
</template>