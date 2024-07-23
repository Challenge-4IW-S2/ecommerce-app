<script setup>
import {ref, onMounted, computed} from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useChart from "../../../composables/useChart.ts";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref([]);

const fetchData = async () => {
  data.value = await getChartData('distributionByPrice');
};

const chartData = computed(() => {
  return {
    labels: data.value.map(item => item._id),
    datasets: [
      {
        label: 'Distribution des prix des produits',
        data: data.value.map(item => item.count),
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(54, 162, 235, 0.6)']
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
    <h2 class="text-xl font-semibold mb-4">Distribution des prix des produits</h2>
    <Pie :data="chartData" />
  </div>
</template>

<style scoped>
</style>
