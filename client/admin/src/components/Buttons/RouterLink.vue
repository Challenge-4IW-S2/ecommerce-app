<script setup>
defineProps({
  to: {
    type: String,
    required: true
  },
  action: {
    type: String,
    default: 'Retour'
  }
})
</script>

<template>
  <router-link :to="to" class="bg-black text-white h-12 block text-center content-center py-2 px-4">{{ action }}</router-link>
</template>

<style scoped>

</style>