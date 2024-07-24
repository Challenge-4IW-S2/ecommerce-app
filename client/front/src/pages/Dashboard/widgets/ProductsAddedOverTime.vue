<script setup>
import { ref, onMounted, computed } from 'vue';
import { Line } from 'vue-chartjs'; // Import Line instead of Pie
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useChart from "../../../composables/useChart.ts";

// Register the necessary components for a Line chart
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref([]);

const fetchData = async () => {
  data.value = await getChartData('productsAddedOverTime');
};

const chartData = computed(() => {
  return {
    labels: data.value.map(item => item._id),
    datasets: [
      {
        label: 'Nombre de produits ajoutés',
        data: data.value.map(item => item.totalProducts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false
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
    <h2 class="text-xl font-semibold mb-4">Évolution du nombre de produits au fil du temps</h2>
    <Line :data="chartData" /> <!-- Use Line here -->
  </div>
</template>