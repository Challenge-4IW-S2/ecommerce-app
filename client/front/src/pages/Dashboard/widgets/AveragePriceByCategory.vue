<script setup>
import { ref, onMounted, computed } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import useChart from "../../../composables/useChart.ts";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref([]);

const fetchData = async () => {
  data.value = await getChartData('averagePriceByCategory');
};

const chartData = computed(() => {
  return {
    labels: data.value.map(item => item.category),
    datasets: [
      {
        label: 'Prix moyen par catégorie',
        data: data.value.map(item => item.averagePrice),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  }
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Prix moyen par catégorie</h2>
    <Bar :data="chartData" />
  </div>
</template>

<style scoped>
</style>