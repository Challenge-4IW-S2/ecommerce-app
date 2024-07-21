<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const product = 'product';
const entityPath = 'product';

const route = 'products';

const { data, actions } = useEntityTable(route, entityPath, []);
</script>

<template>
  <div>
    <h1>Product Dashboard</h1>
    <Table :params="data" :actions="actions" :title="product" :to="`/admin/add-${product}`" />
  </div>
</template>

<style scoped>
/* Ajoutez votre style ici */
</style>
