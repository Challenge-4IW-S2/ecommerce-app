<script setup>
defineProps({
  type: {
    type: String,
    default: "submit"
  },
  text: {
    type: String,
    default: 'Action'
  }
})
</script>

<template>
  <button :type="type" class="bg-black text-white h-12 block text-center content-center w-full">{{ text }}</button>
</template>

<style scoped>

</style>