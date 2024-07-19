<script setup>
import { useCartStore } from '../../store/cart.js'
import OpenCart from "./OpenCart.vue"

const cartStore = useCartStore()
</script>

<template>
  <div v-if="cartStore.isCartOpen" class="fixed inset-0 bg-black bg-opacity-50 z-10"></div>

  <button class="uppercase text-sm" @click="cartStore.toggleCart">
    Panier ({{ cartStore.itemCount }})
  </button>
  <div v-if="cartStore.isCartOpen">
    <OpenCart :closeFunction="cartStore.toggleCart" />
  </div>
</template>