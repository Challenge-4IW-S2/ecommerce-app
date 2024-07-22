<script setup>
import router from "../../router.js";
import { useAPI } from "../../composables/useAPI.js";

const props = defineProps({
  title: {
    type: String,
    default: 'Addresses'
  },
  address: {
    type: Object,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});
const deleteAddress = async (id) => {
  try {
    if (!confirm('Are you sure you want to delete this address?')) {
      return;
    }
    await useAPI('delete', `address/${id}`, {}, {}, '');
    router.go();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="grid gap-6 grid-cols-1 grid-rows-1 md:grid-cols-2 mb-4">
    <div v-for="address in address"
         :key="address.id"
        class="flex flex-col border border-black w-full p-2 mb-2 ">
      <div class="flex flex-col font-extralight text-sm p-2">
        <span>{{ address.address }}</span>
        <span>{{ address.street || '270 Rue du Faubourg Saint-Antoine' }}</span>
        <span>{{ address.postal_code || '75012 Paris' }}</span>
        <span>{{ address.country || 'France' }}</span>
        <div class="flex gap-44 self-center">

          <router-link :to="`/admin/edit-address/${address.id}/${userId}`" class="text-sm underline font-normal">Edit</router-link>
          <button @click.prevent="deleteAddress(address.id)" class="text-sm underline font-normal">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>
