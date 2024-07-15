<script setup>

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

          <router-link :to="`/admin/add-address/${address.id}/${userId}`" class="text-sm underline font-normal">Edit</router-link>
          <router-link :to="`/admin/add-address/${userId}`" class="text-sm underline font-normal">Delete</router-link>

        </div>
      </div>
    </div>
  </div>
</template>
