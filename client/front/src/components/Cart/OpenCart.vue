<script setup>
import { useCartStore } from "../../store/cart.js";
import Button from '../Buttons/Button.vue';
import { loadStripe} from "@stripe/stripe-js";
import {ref} from "vue";
import StripeCheckout from "./StripeCheckout.vue";



const cartStore = useCartStore();
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const stripe = ref(null);
const elements = ref(null);
const cardElement = ref(null);

defineProps({
  closeFunction: Function
});

const increaseQuantity = (productId) => {
  const product = cartStore.items.find(item => item._id === productId);
  if (product) {
    if (product.quantity >= 18) {
      alert("La quantité maximale est de 18, si vous avez besoin de plus, veuillez contacter le support.")
      return;
    }
    cartStore.updateQuantity(productId, product.quantity + 1);
  }
};

const updateQuantity = (productId, quantity) => {
  const product = cartStore.items.find(item => item._id === productId);
  if (product) {
    cartStore.updateQuantity(productId, Number(quantity));
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
          <select v-model="item.quantity" @change="updateQuantity(item._id, $event.target.value)">
            <option v-for="number in 18" :value="number">{{ number }}</option>
          </select>
        </div>
        <span>{{ item.price_ttc }} EUR</span>
        <button @click="cartStore.removeFromCart(item._id)">Supprimer</button>
      </li>
    </ul>
    <div>Total: {{ cartStore.total }} EUR</div>
    <StripeCheckout @close-cart="closeFunction"/>
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