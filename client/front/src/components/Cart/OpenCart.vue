<script setup>
import { useCartStore } from "../../store/cart.js";
import Button from '../Buttons/Button.vue';

const cartStore = useCartStore();
defineProps({
  closeFunction: Function
});

const increaseQuantity = (productId) => {
  const product = cartStore.items.find(item => item.id === productId);
  if (product) {
    cartStore.updateQuantity(productId, product.quantity + 1);
  }
};

const decreaseQuantity = (productId) => {
  const product = cartStore.items.find(item => item.id === productId);
  if (product && product.quantity > 1) {
    cartStore.updateQuantity(productId, product.quantity - 1);
  }
};
</script>

<template>
  <div class="p-8 bg-white flex flex-col absolute top-0 right-0 w-96 h-screen text-black items-center z-20 gap-3">
    <button @click="closeFunction" class="self-end">Fermer</button>
    <div class="self-start flex justify-between items-center w-full">
      <span class="font-bold text-lg">Votre panier</span>
      <button @click="cartStore.clearCart">Vider le panier</button>
    </div>
    <ul class="w-full">
      <li v-for="item in cartStore.items" :key="item.id" class="flex justify-between">
        <span>{{ item.name }}</span>
        <div>
          <button @click="decreaseQuantity(item.id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item.id)">+</button>
        </div>
        <span>{{ item.price_ttc }} EUR</span>
        <button @click="cartStore.removeFromCart(item.id)">Supprimer</button>
      </li>
    </ul>
    <div>Total: {{ cartStore.total }} EUR</div>
  </div>
</template>