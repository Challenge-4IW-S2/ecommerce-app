<script setup>

const sizingStyle = ` h-12 block text-center content-center`;

defineProps({
  to: {
    type: String,
    default: "#"
  },
  text: {
    type: String,
    default: 'Action'
  },
  className: {
    type: String,
    default: "bg-black text-white"
  }
})
</script>

<template>
  <RouterLink :to="to" :class="className + sizingStyle">
    {{ text }}
  </RouterLink>
</template>

<style scoped>

</style>