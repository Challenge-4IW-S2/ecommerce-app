<script setup>
import {ref, onMounted, computed} from 'vue';
import { Bubble } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import useChart from "../../../composables/useChart.ts";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const { getChartData } = useChart(`${import.meta.env.VITE_API_BASE_URL}`);
const data = ref([]);

const fetchData = async () => {
  data.value = await getChartData('getTheMostExpensiveProducts');
  console.log("data.value Most", data.value);
};

const chartData = computed(() => {
  return {
    labels: data.value.map(item => item.category),
    datasets: [
      {
        label: 'Produits les plus chers par catégorie',
        data: data.value.map(item => item.price),
        backgroundColor: 'rgba(255, 99, 132, 0.6)'
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
    <h2 class="text-xl mb-4">Produits les plus chers par catégorie</h2>
    <Bar :data="chartData" />
  </div>
</template>

<style scoped>
</style>
