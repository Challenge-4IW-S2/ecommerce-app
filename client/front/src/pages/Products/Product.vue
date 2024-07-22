<script setup>
import { ref, onMounted, computed } from 'vue';
import z from 'zod';
import { useRoute } from 'vue-router';
import ky from 'ky';
import CardDescription from '../../components/CardDescription.vue';
import { useCartStore } from "../../store/cart.js";
import Warning from '../../components/Alerts/Warning.vue';

const route = useRoute();
const slug = computed(() => route.params.slug);
let product = ref([]);
const cartStore = useCartStore();

const showWarning = ref(false);
const warningMessage = ref('');

const getProduct = async () => {
    try {
        await ky.get(`${import.meta.env.VITE_API_BASE_URL}/getProduct/${slug.value}`).json().then((response) => {
            product.value = response[0];
        });
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
};

const addProductToBag = () => {
  const existingProduct = cartStore.items.find(item => item._id === product.value._id);
  if (existingProduct) {
    if (existingProduct.quantity >= 18) {
      showWarning.value = true;
      warningMessage.value = "La quantité maximale est de 18, si vous avez besoin de plus, veuillez contacter le support.";
      return;
    } else {
      // Increase the quantity by 1 if it doesn't exceed the limit
      cartStore.updateQuantity(existingProduct._id, existingProduct.quantity + 1);
    }
  } else {
    // If the product doesn't exist in the cart, add it
    cartStore.addToCart(product.value);
  }
};

onMounted(getProduct);
</script>


<template>
  <Warning v-if="showWarning" :message="warningMessage" @close="showWarning = false" />
  <CardDescription :product="product" @addProductToBag="addProductToBag" />
</template>