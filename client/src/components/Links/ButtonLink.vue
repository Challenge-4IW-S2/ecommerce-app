<script setup>
defineProps({
  to: {
    type: String,
    default: "#"
  },
  text: {
    type: String,
    default: 'Action'
  }
})
</script>

<template>
  <a :href="to" class="bg-black text-white h-12 block text-center content-center">{{ text }}</a>
</template>

<style scoped>

</style>