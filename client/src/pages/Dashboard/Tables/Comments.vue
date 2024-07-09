<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const product = 'product';
const entityPath = 'product';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}products`;

const { data, actions } = useEntityTable(baseUrl,route, entityPath, []);
</script>

<template>
  <div>
    <h1>Comments Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-comment`"/>
  </div>
</template>

<style scoped>

</style>