<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';
import { useGeneratePDF } from "../../../composables/useGeneratorPDF.ts";
import { useAPI } from "../../../composables/useAPI.js";


const entityPath = 'order';

const route = 'orders';


const { data, actions } = useEntityTable(route, entityPath, [{
  label: "Télécharger en PDF",
  method: async ({ row }) => {
    const { generatePDF } = useGeneratePDF();
    try {
      const { results } = await useAPI('get', `order/${row.id}`, {}, {}, '');
      const response = results.value;
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
    <Table :params="data" :actions="actions" :title="'orders'" />
  </div>
</template>

<style scoped></style>