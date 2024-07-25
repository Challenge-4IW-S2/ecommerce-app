// src/components/Links/ButtonLink.vue
<template>
  <RouterLink :to="to">{{ text }}</RouterLink>
</template>

<script>
export default {
  name: 'ButtonLink',
  props: {
    to: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  }
};
</script>