<script setup>
import ProductByCategory from "./widgets/ProductByCategory.vue";
import AveragePriceByCategory from "./widgets/AveragePriceByCategory.vue";
import PriceDistribution from "./widgets/PriceDistribution.vue";
import ProductsAddedOverTime from "./widgets/ProductsAddedOverTime.vue";
import MostExpensiveProductsByCategory from "./widgets/MostExpensiveProductsByCategory.vue";
import NewProductsByCategory from "./widgets/newProductsByCategory.vue";

</script>

<template>
  <div class="p-6">
    <h1 class="text-center text-3xl font-bold mb-6 p-4">Tableau de Bord</h1>
    <p class="text-center">  </p>
    <div>
      <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-4">
        <ProductsAddedOverTime class="bg-white p-4 rounded-lg shadow-md mb-4"/>
        <AveragePriceByCategory class="bg-white p-4 rounded-lg shadow-md mb-4"/>
      </div>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      <ProductByCategory class="bg-white p-4 rounded-lg shadow-md "/>
      <NewProductsByCategory class="bg-white p-4 rounded-lg shadow-md"/>
    </div>
  </div>
</template>
<style scoped>

</style>