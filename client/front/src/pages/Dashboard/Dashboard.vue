<script setup>
import ky from "ky";
import { onMounted, ref } from "vue";
import { Bar, Pie, Line } from 'vue-chartjs';
import useChart from "../../composables/useChart.ts";


const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref({
  salesByCategory: [],
  activeProductsByCategory: [],
  averagePriceByCategory: [],
  latestProducts: []
});

const fetchData = async () => {
  data.value.salesByCategory = await getChartData('salesByCategory');
  data.value.averagePriceByCategory = await getChartData('averagePriceByCategory');
  data.value.latestProducts = await getChartData('latestProducts');
  data.value.activeProductsByCategory = await getChartData('activeProductsByCategory');

  // Calcul des KPI
  data.value.salesTotal = data.value.salesByCategory.reduce((acc, item) => acc + item.totalSales, 0);
  data.value.averagePrice = data.value.averagePriceByCategory.reduce((acc, item) => acc + item.avgPrice, 0) / averagePriceByCategory.length;
  data.activeProductsCount = data.value.activeProductsByCategory.reduce((acc, item) => acc + item.activeProducts, 0);


  data.value.salesTotal = data.value.salesByCategory.reduce((acc, item) => acc + item.totalSales, 0);
  data.value.activeProductsCount = data.value.activeProductsByCategory.reduce((acc, item) => acc + item.count, 0);
  data.value.averagePrice = data.value.averagePriceByCategory.reduce((acc, item) => acc + item.avgPrice, 0) / averagePriceByCategory.length;


};


onMounted(() => {
  fetchData();
});
console.log(data.value.salesByCategory);
const test = data.value.salesByCategory.map(item => item.category);
console.log(test);

</script>

<template>
  <div>
    <h1>Tableau de Bord</h1>
    <div class="kpi-container">
      <!-- KPI : Ventes Totales -->
      <div class="kpi">
        <h2>Ventes Totales</h2>
        <p>{{ data.salesTotal | currency }}</p>
      </div>

      <!-- KPI : Nombre de Produits Actifs -->
      <div class="kpi">
        <h2>Produits Actifs</h2>
        <p>{{ data.activeProductsCount }}</p>
      </div>

      <!-- KPI : Prix Moyen des Produits -->
      <div class="kpi">
        <h2>Prix Moyen</h2>
        <p>{{ data.averagePrice | currency }}</p>
      </div>

      <!-- KPI : Commentaires Totaux -->
      <div class="kpi">
        <h2>Commentaires Totaux</h2>
        <p>{{ data.totalComments }}</p>
      </div>
    </div>
    <div>
      <h2>Ventes par catégorie</h2>
      <Bar :data="{
        labels: data.salesByCategory.map(item => item.category),
        datasets: [{
          label: 'Total des ventes',
          data: data.salesByCategory.map(item => item.totalSales),
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        }]
      }" />

      <h2>Prix moyen par catégorie</h2>
      <Pie :data="{
        labels: data.averagePriceByCategory.map(item => item.category),
        datasets: [{
          label: 'Prix moyen',
          data: data.averagePriceByCategory.map(item => item.avgPrice),
          backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 159, 64, 0.6)']
        }]
      }" />

      <h2>Derniers produits</h2>
      <Line :data="{
        labels: data.latestProducts.map(item => item.name),
        datasets: [{
        label: 'Derniers Produits',
        data: data.latestProducts.map(item => item.price_ttc),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)'
        }]
      }" />



    </div>
  </div>
</template>

<style scoped>

</style>