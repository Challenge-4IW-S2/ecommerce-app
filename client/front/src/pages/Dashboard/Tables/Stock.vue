<script setup>
import {useStockStore} from "../../../store/useStockStore.js";
import {computed, onMounted, ref} from "vue";
import { Chart } from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import fr from 'date-fns/locale/fr';

import ky from "ky";
const chartRef = ref(null);
const stockHistory = ref([]);

const fetchStockHistory = async () => {
  try {
    stockHistory.value = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/history`).json();
  } catch (error) {
    console.error('Failed to fetch stock history:', error);
  }
};



onMounted(async () => {
  await fetchStockHistory();

  const labels = stockHistory.value.map((stock) => new Date(stock.createdAt));
  const dataPoints = stockHistory.value.map((stock) => stock.stock_level);


  const ctx = document.getElementById('stockChart').getContext('2d');
  function getRandomColor(alpha = 1) {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stock Quantity Over Time',
        data: dataPoints,
        borderColor: getRandomColor(),
        backgroundColor: getRandomColor(0.3),
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: {
          type: 'time',
          time: {
            parser: 'yyyy-MM-dd',
            unit: 'month',
            displayFormats: {
              month: 'MMM yyyy'
            },
            tooltipFormat: 'MMM dd, yyyy'
          },
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Stock Level'
          }
        }
      },
      plugins: {
        legend: {
          display: true
        }
      },
    }
  });
});

</script>
<template>
  <h1>Stock</h1>

  <div>
    <canvas id="stockChart"></canvas>
  </div>
</template>

<style scoped>

</style>