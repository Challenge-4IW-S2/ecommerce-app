<script setup>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {computed, reactive} from "vue";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

defineProps(['data']);

const chartData = computed(() => {
  return {
    labels: props.data.map(item => item.category),
    datasets: [
      {
        label: 'Total des ventes par catégorie',
        data: props.data.map(item => item.totalSales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  }
});

</script>

<template>
  <div>
    <h2>Ventes par catégorie</h2>
    <Bar :data="chartData" />
  </div>
</template>

<style scoped>

</style>