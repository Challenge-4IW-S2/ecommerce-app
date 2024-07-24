<template>
  <div :style="styleObject">
    € {{ value }}
  </div>

</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    styleObject: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped>
div {
  /* Styles pour assurer la visibilité */
  padding: 8px;
  color: black;
  border-radius: 4px;
  text-align: center;
}
</style>