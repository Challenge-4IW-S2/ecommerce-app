<script setup>
import { useCartStore } from "../../store/cart.js";
import Button from '../Buttons/Button.vue';

const cartStore = useCartStore();
defineProps({
  closeFunction: Function
});

const increaseQuantity = (productId) => {
  const product = cartStore.items.find(item => item._id === productId);
  if (product) {
    cartStore.updateQuantity(productId, product.quantity + 1);
  }
};

const decreaseQuantity = (productId) => {
  const product = cartStore.items.find(item => item._id === productId);
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
      <li v-for="item in cartStore.items" :key="item._id" class="flex justify-between">
        <span>{{ item.name }}</span>
        <div>
          <button @click="decreaseQuantity(item._id)">-</button>
          <span>{{ item.quantity }}</span>
          <button @click="increaseQuantity(item._id)">+</button>
        </div>
        <span>{{ item.price_ttc }} EUR</span>
        <button @click="cartStore.removeFromCart(item._id)">Supprimer</button>
      </li>
    </ul>
    <div>Total: {{ cartStore.total }} EUR</div>
  </div>
</template>

<style scoped>
.cart-item {
  @apply flex justify-between items-center;
}

@media (max-width: 768px) {
  .cart {
    @apply w-4/5;
  }
}

@media (max-width: 480px) {
  .cart {
    @apply w-full;
  }
  .cart-item {
    @apply flex-col items-start;
  }
}
</style>