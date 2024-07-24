<script setup>
import ky from "ky";
import {computed, onMounted, reactive} from "vue";
import Button from "../../components/Buttons/Button.vue";

const orders = reactive([]);

const getOrders = async () => {
  return ky.get(`${import.meta.env.VITE_API_BASE_URL}/order-history`, { // Ensure the endpoint matches the server's route
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
    orders.push(...data.orders);
  }
});

const ordersList = computed(() => orders);

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
    <h1>Mes commandes</h1>
    <div class="min-w-96 mt-4">
      <div v-if="ordersList.length === 0">
        Vous n'avez pas encore passé de commande.
      </div>
      <div v-else>
        <div class="w-full flex flex-col gap-y-4">
          <div v-for="order in ordersList" :key="order.id" class="border border-black w-full flex flex-col font-extralight text-sm">
            <div class="border-b border-black bg-[#f3f3f3]">
              <span class="px-2 py-1 block">
                Statut de la commande :
                <strong>
                  {{ order.status || 'Livrée (fausse donnée)' }}
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
                <span class="w-max">N° de commande : <strong>{{ order.id }}</strong></span>
                <span class="w-max">Prix de la commande : <strong>{{ order.total_price }}€</strong></span>
              </div>
              <div class="flex flex-col">
                <span class="w-max">Commande créée le : {{ formatDate(order.createdAt) }}</span>
                <span class="w-max">Dernière mise à jour le : {{ formatDate(order.updatedAt) }}</span>
              </div>
              <div class="flex gap-x-2">
                <Button class="mt-4 font-normal" text="Télécharger ma facture " />
                <Button
                    class="mt-4 font-normal"
                    text="Commander à nouveau" />
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