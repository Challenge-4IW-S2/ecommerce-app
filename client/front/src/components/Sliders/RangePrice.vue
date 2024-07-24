<template>
  <v-card flat color="transparent">
    <h1>Gamme de prix</h1>
    <v-card-text>
      <v-row>
        <v-col class="px-4">
          <v-range-slider
              v-model="range"
              :max="max"
              :min="min"
              hide-details
              class="align-center"
              @change="emitUpdateRange"
              step="1"
          >
          <template v-slot:prepend>
            <ReadOnlyField
                :value="minRange"
                :styleObject="{ width: '100px' }"
            ></ReadOnlyField>

          </template>
          <template v-slot:append>
            <ReadOnlyField
                :value="maxRange"
                :styleObject="{ width: '100px' }"
            ></ReadOnlyField>

          </template>
          </v-range-slider>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>

import ReadOnlyField from "./ReadOnlyField.vue";
import ky from "ky";

export default {
  components: {
    ReadOnlyField
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      localMin: this.min,
      localMax: this.max,
      range: [this.min, this.max]
    };
  },
  computed:{
    minRange(){
      return this.range[0];
    },
    maxRange(){
      return this.range[1];
    }
  },
  methods: {
    emitUpdateRange() {
      this.$emit('update-range', { minPrice: this.range[0], maxPrice: this.range[1] });
    }
  },
  mounted() {
    const loadDate = async () => {
      try {
        const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
          credentials: "include"
        }).json();
        const prices = response.map(product => Number(product.price_ttc));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        this.localMin = minPrice; // Update localMin instead of prop min
        this.localMax = maxPrice; // Update localMax instead of prop max
        this.range = [minPrice, maxPrice];
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      }
    }
    loadDate();
  },
};
</script>

<style scoped>
h1 {
  padding-top: 30px;
}
</style>