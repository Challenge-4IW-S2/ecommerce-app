<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const entityPath = 'category';

const route = 'categories';

const { data, actions } = useEntityTable(route, entityPath, []);
</script>

<template>
  <div>
    <h1>Categories Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-category`" :title="'Category'" />
  </div>
</template>

<style scoped></style>