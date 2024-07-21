<script setup>
import {useStockStore} from "../../../store/useStockStore.js";
import {computed, onMounted, ref} from "vue";
import { Chart } from 'chart.js';
const chartRef = ref(null);

const stockStore = useStockStore();
const lowStockProducts = computed(() => stockStore.getLowStockProducts());
onMounted(async () => {
  await stockStore.fetchStockHistory();
  const ctx = document.getElementById('stockChart').getContext('2d');

  const labels = stockStore.stockHistory.map(item => item.month);
  console.log(labels)
  const data = stockStore.stockHistory.map(item => item.quantity);
  console.log(data)

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Quantity Over Time',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)'
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'month'
          }
        }
      }
    }
  });
});

</script>
<template>
  <div v-if="lowStockProducts.length">
    <h2>Low Stock Alert</h2>
    <ul>
      <li v-for="product in lowStockProducts" :key="product.id">
        {{ product.name }} is low in stock. Current stock: {{ product.quantity }}
      </li>
    </ul>
  </div>
  <div>
    <canvas id="stockChart"></canvas>
  </div>
</template>

<style scoped>

</style>