<script setup>
import Table from "../../components/Tables/Table.vue";
import { useEntityTable } from '../../composables/useEntityTable.ts';

const entityPath = 'address';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}/addresses`;

const { data, actions } = useEntityTable(baseUrl,route, entityPath, []);
</script>

<template>
  <div>
    <h1>Addresses Dashboard</h1>
    <Table :params="data" :actions="actions" :title="'Address'" />
  </div>
</template>

<style scoped>

</style>