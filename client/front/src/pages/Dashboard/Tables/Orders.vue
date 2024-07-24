<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';
import ky from "ky";
import { useGeneratePDF } from "../../../composables/useGeneratorPDF.ts";


const entityPath = 'order';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}/orders`;


const { data, actions } = useEntityTable(baseUrl,route, entityPath, [{
  label: "Télécharger en PDF",
  method: async ({ row }) => {
    const { generatePDF } = useGeneratePDF();
    try {
      const response = await ky.get(`${baseUrl}/order/${row.id}`, {
        credentials: "include"
      }).json();
      const { address, user, products, order } = response.invoice;
      generatePDF({ address, user, products, order });

    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
    }
  },
  color: 'black',

}

]);
</script>

<template>
  <div>
    <h1>Orders Dashboard</h1>
    <Table :params="data" :actions="actions" :title="'orders'"/>
  </div>
</template>

<style scoped>

</style>