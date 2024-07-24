<script setup>
import ky from "ky";
import {computed, onMounted, reactive} from "vue";

const addresses = reactive([]);

const getOrders = async () => {
  return ky.get(`${import.meta.env.VITE_API_BASE_URL}/address-list`, { // Ensure the endpoint matches the server's route
    credentials: "include",
  }).then((response) => response.json()).then((data) => {
    return data;
  }).catch((error) => {
    console.error(error);
  });
}

onMounted(async () => {
  const data = await getOrders();
  if (data) {
    addresses.push(...data.orders);
  }
});

const addressList = computed(() => addresses);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // JavaScript months are 0-based.
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
</script>

<template>
  <div>
    <h1>Mes adresses</h1>
    <div class="min-w-96 mt-4">
      <div v-if="addressList.length === 0">
        Vous n'avez pas enregistré d'adresses.
      </div>
      <div v-else>
        <div class="w-full flex flex-col gap-y-4">
          <div v-for="address in addressList" :key="address.id" class="border border-black w-full flex flex-col font-extralight text-sm">
            <div class="border-b border-black bg-[#f3f3f3]">
              <span class="px-2 py-1 block">
                Statut de la commande :
                <strong>
                  {{ address.status || 'Livrée (fausse donnée)' }}
                </strong>
              </span>
            </div>
            <div class="px-2 mt-2">
              <span>Résumé de la commande :</span>
              <ul>
                <li>A</li>
              </ul>
            </div>
            <div class="p-2">
              <div class="flex flex-row justify-between flex-wrap mb-4 gap-x-4">
                <span class="w-max">N° de commande : <strong>{{ address.id }}</strong></span>
                <span class="w-max">Prix de la commande : <strong>{{ address.total_price || ''}}€</strong></span>
              </div>
              <div class="flex flex-col">
                <span class="w-max">Commande créée le : {{ formatDate(address.createdAt) }}</span>
                <span class="w-max">Dernière mise à jour le : {{ formatDate(address.updatedAt) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>