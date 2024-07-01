<script setup>
import Table from "../../../components/Tables/Table.vue";
import { ref, computed } from "vue";
import ky from "ky";
import { useRoute, useRouter } from "vue-router";
const router = useRouter()
const route = useRoute()
// Définir les données dynamiques
const data = ref( [] )
// Définir les actions dynamiques
const actions = ref([
  {
    label: 'Edit',
    method: (row) => {
      router.push(`/admin/users/${row}`)
    },
    color: 'blue',
  },
  {
    label: 'Delete',
    method: (row) => {
      const response = ky.delete(`${import.meta.env.VITE_API_BASE_URL}/users/${row}`);
      location.reload();
    },
    color: 'red',
  },
]);

const fetchData = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users`).json();
    console.log(response)
    if (response.length > 0) {
      data.value = response;
      const role = response.map((user) => user.role)
      const user_roles = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/users/role`,{
        json: {
          role: role[0]
        },
      }).json();
      data.value.forEach((user) => {
        if (user.role === user_roles.id) {
          user.role = user_roles.name;
        }
      });
    } else {
      console.log('No data found');
    }
  } catch (error) {

    console.log(error);
  }
}
fetchData();

</script>

<template>
  <div>
    <h1>User Dashboard</h1>
  </div>
  <Table :params="data" :actions="actions"  />

</template>

<style scoped>

</style>