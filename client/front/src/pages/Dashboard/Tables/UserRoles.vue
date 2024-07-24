<script setup>
import Table from "../../../components/Tables/Table.vue";
import { useEntityTable } from '../../../composables/useEntityTable.ts';

const entityPath = 'userrole';

const route = 'userroles';

const { data, actions } = useEntityTable(route, entityPath, []);
</script>

<template>
  <div>
    <h1>UserRoles Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-userRole`" :title="'userRole'" />
  </div>
</template>

<style scoped></style>