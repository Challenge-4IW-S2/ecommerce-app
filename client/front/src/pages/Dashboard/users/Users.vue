<script setup>
import Table from "../../../components/Tables/Table.vue";
import { ref, computed } from "vue";
import ky from "ky";
import {  useRouter } from "vue-router";
const router = useRouter()
// Définir les données dynamiques
const data = ref( [] )
// Définir les actions dynamiques
const actions = ref([
  {
    label: 'Modifier',
    method: (row) => {
      router.push(`/admin/user/${row.id}`)
    },
    color: 'blue',
  },
  {
    label: 'Supprimer',
    method: (row) => {
      const response = ky.delete(`${import.meta.env.VITE_API_BASE_URL}/user/${row.id}`, {
        credentials: "include"
      });
      location.reload();
    },
    color: 'red',
  },
  {
    label: 'Exporter',
    method: async (row) => {
      try {
        const csv = Object.keys(row).map(key => `${key},${row[key]}`).join('\n');
        if (window.showSaveFilePicker) {
          const fileHandle = await window.showSaveFilePicker({
            suggestedName: `${row.lastname}-${row.firstname}.csv`,
            types: [
              {
                description: 'Fichier CSV',
                accept: {
                  'text/csv': ['.csv'],
                },
              },
            ],
          });
          const writable = await fileHandle.createWritable();
          await writable.write(new Blob([csv], { type: 'text/csv' }));
          await writable.close();
        }else {
          const blob = new Blob([csv], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${row.name}.csv`;
          a.click();
          URL.revokeObjectURL(url); // libérer le blob
        }
      } catch (error) {
        console.error('Erreur lors de l\'exportation du CSV:', error);
      }
    },
    color: 'green',
  },
]);

const fetchData = async () => {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/users`, {
      credentials: "include"
    }).json();
    if (response.length > 0) {
      data.value = response;
      const role = response.map((user) => user.role)
      const user_roles = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/role`,{
        json: {
          role: role[0]
        },
        credentials: "include"
      }).json();
      data.value.forEach((user) => {
        if (user.role === user_roles.id) {
          user.role = user_roles.name;
        }
      });
    } else {

    }
  } catch (error) {

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