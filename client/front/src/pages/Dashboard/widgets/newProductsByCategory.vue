<script setup>
import { ref, onMounted, computed } from 'vue';
import { Line } from 'vue-chartjs'; // Import Line instead of Bubble
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, LineElement, PointElement } from 'chart.js';
import useChart from "../../../composables/useChart.ts";

ChartJS.register(Title, Tooltip, Legend, ArcElement, LineElement, PointElement);

const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref([]);

const fetchData = async () => {
  data.value = await getChartData('newProductsByCategory');
};

const chartData = computed(() => {
  return {
    labels: data.value.map(item => item.category),
    datasets: [
      {
        label: 'Nouveaux produits par catégorie',
        data: data.value.map(item => item.count),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        fill: false,
        tension: 0.1 // Adds some curve between points
      }
    ]
  };
});

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Nouveaux produits par catégorie</h2>
    <Line :data="chartData" /> <!-- Use Line here -->
  </div>
</template>

<style scoped>
</style>