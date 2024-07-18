<script setup>
import Table from "../../components/Tables/Table.vue";
import { useEntityTable } from '../../composables/useEntityTable.ts';

const entityPath = 'comment';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}/comments`;

const { data, actions } = useEntityTable(baseUrl,route, entityPath, []);
</script>

<template>
  <div>
    <h1>Comments Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-comment`" :title="'comments'"/>
  </div>
</template>

<style scoped>

</style>