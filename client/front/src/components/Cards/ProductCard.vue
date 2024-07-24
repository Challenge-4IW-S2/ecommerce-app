<template>
  <div class="product-card" @click="redirectToProduct(product.slug)">
    <img :src="product.image" alt="Product image" class="product-image">
    <h3>{{ product.name }}</h3>
    <p>{{ product.price_ttc }} € </p>
    <!-- Additional actions can be added here -->
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from "vue-router";

const props = defineProps({
  product: Object
});

const router = useRouter();

const redirectToProduct = (slug) => {
  router.push(`/product/{$slug}`);
};

</script>

<style scoped>
.product-card {
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  width: 200px;
}
.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
}
</style>