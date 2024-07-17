<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const entityPath = 'userrole';
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}userroles`;

const { data, actions } = useEntityTable(baseUrl,route, entityPath, []);
</script>

<template>
  <div>
    <h1>UserRoles Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-userRole`" :title="'userRole'"/>
  </div>
</template>

<style scoped>

</style>