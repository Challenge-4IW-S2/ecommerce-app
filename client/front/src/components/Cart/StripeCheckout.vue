<script setup>

import { useCartStore } from '../../store/cart.js';
import { loadStripe } from '@stripe/stripe-js';
import ky from "ky";
import { useRouter } from 'vue-router';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
const router = useRouter();
const emit = defineEmits(['close-cart']);

const handleCheckout = async () => {
  const cartStore = useCartStore();
  const stripe = await stripePromise;
  try {
    const response = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/create-payment-intent`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartStore.items,
      }),
      credentials: 'include',
    }).json();

    if (response.id) {
      const result = await stripe.redirectToCheckout({
        sessionId: response.id,
      });

      if (result.error) {
        alert(result.error.message);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 401) {
      // Rediriger vers /login si la réponse est 401 Unauthorized
      await router.push('/login');
      // fermer le panier
      emit('close-cart');
    } else {
      console.error('Erreur lors du paiement:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  }
};
</script>

<template>
  <button @click="handleCheckout">Payer avec stripe</button>
</template>

<style scoped>

</style>