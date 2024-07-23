<script setup>
import ky from "ky";
import {computed, onMounted, reactive} from "vue";

const orders = reactive([]);

const getOrders = async () => {
  return ky.get(`${import.meta.env.VITE_API_BASE_URL}/orders`, { // Ensure the endpoint matches the server's route
    credentials: "include",
  }).then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data; // Assuming the server response structure matches the expected
      }).catch((error) => {
        console.error(error);
      });
}

onMounted(async () => {
  const data = await getOrders();
  if (data) {
    orders.push(...data);
  }
});

const ordersList = computed(() => orders);
</script>

<template>
  <div>
    <h1>Mes commandes</h1>
    <div>
      <div v-if="ordersList.length === 0">Aucune commande</div>
      <div v-else>
        <div v-for="order in ordersList" :key="order.id">
          <div>{{ order.id }}</div>
          <div>{{ order.total_price }}</div>
          <div>{{ order.createdAt }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>