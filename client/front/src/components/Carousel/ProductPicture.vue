<script setup>

import Button from "../Buttons/Button.vue";
import ky from "ky";
import router from "../../router.js";
const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  productId: String
});


const deleteImage = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }
    const response = await ky.delete(`${import.meta.env.VITE_API_BASE_URL}/productPicture/${id}`);
    router.go();
  } catch (error) {
    console.error(error);
  }
}

</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <div v-for="image in images" :key="image.id">
      <img :src="`/src/assets/${image.url}`" alt="image" class="w-24 h-90 object-cover" />

      <button @click.prevent="deleteImage(image.id)" class="mb-4 text-left text-sm underline font-normal">
        Delete
      </button>
    </div>
  </div>
</template>

<style scoped>
button {
  cursor: pointer;
}
</style>