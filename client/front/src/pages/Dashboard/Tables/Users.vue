<script setup>
import Table from "../../../components/Tables/Table.vue";
import {useEntityTable} from "../../../composables/useEntityTable.ts";

const user = 'user';
const roleApiUrl = `${import.meta.env.VITE_API_BASE_URL}/userRoles`;
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const route = `${import.meta.env.VITE_API_BASE_URL}/users`;
const entityPath = 'user';

//const { data, actions } = useEntityTable(baseUrl,route, entityPath,[], roleApiUrl);
const {data,
  searchQuery,
  selectedRows,
  paginatedData,
  totalPages,
  currentPage,
  itemsPerPage,
  sortKey,
  sortOrder,
  isAllSelected,
  toggleSelectAll,
  toggleRowSelection,
  changeSort,
  actions,
  fetchData,
} = useEntityTable(baseUrl,route, entityPath,[], roleApiUrl);
const deleteSelected = async () => {
  try {
    const selectedData = data.value.filter(row => selectedRows.value.includes(row.id));
    const selectedIds = selectedData.map(row => row.id);
  } catch (error) {

  }
};
</script>

<template>
  <div>
    <h1>User Dashboard</h1>
    <Table :params="data" :actions="actions" :to="`/admin/add-${user}`"/>
  </div>
</template>

<style scoped>
</style>