<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const entityPath = 'order';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}orders`;

const { data, actions } = useEntityTable(baseUrl,route, entityPath, []);
</script>

<template>
  <div>
    <h1>Orders Dashboard</h1>
    <Table :params="data" :actions="actions" />
  </div>
</template>

<style scoped>

</style>