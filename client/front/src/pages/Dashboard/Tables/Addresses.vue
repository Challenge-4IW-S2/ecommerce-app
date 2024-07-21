<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const entityPath = 'address';
const route = 'addresses';

const { data, actions } = useEntityTable(route, entityPath, []);
</script>

<template>
  <div>
    <h1>Addresses Dashboard</h1>
    <Table :params="data" :actions="actions" :title="'Address'" />
  </div>
</template>

<style scoped>

</style>