<script setup>
import { ref, computed } from 'vue';
import ky from "ky";

// Définir les props reçues par le composant
const props = defineProps({
  params: {
    type: Array,
    default: () => []
  },
  actions: {
    type: Array,
    default: () => [],
  },
  title: {
    type: String,
    default: 'User'
  },
  to: {
    type: String,
    default: ''
  }
});

const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = ref(10);

const selectedRows = ref([]);

// Calcul des données filtrées en fonction de la recherche
const filteredData = computed(() => {
  if (!searchQuery.value) return props.params;
  return props.params.filter(row =>
      Object.values(row).some(
          value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
      )
  );
});

// Gestion de la pagination
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredData.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));

// Gestion de la sélection de toutes les lignes
const isAllSelected = computed({
  get: () => selectedRows.value.length === props.params.length,
  set: (value) => {
    if (value) {
      selectedRows.value = props.params.map(row => row.id);
    } else {
      selectedRows.value = [];
    }
  }
});

// Méthode pour basculer la sélection de toutes les lignes
const toggleSelectAll = () => {
  isAllSelected.value = !isAllSelected.value;
};


const toggleRowSelection = (rowId) => {
  if (selectedRows.value.includes(rowId)) {
    selectedRows.value = selectedRows.value.filter(id => id !== rowId);
  } else {
    selectedRows.value.push(rowId);
  }
};

// Utiliser une fonction pour déterminer la classe des boutons
function getButtonClass(color) {
  switch (color) {
    case 'red':
      return 'bg-red-500 hover:bg-red-700';
    case 'blue':
      return 'bg-blue-500 hover:bg-blue-700';
    case 'green':
      return 'bg-green-500 hover:bg-green-700';
    default:
      return 'bg-gray-500 hover:bg-gray-700';
  }
}

// Pagination
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const exportSelectedRows = async () => {
  try {
    const selectedData = props.params.filter(row => selectedRows.value.includes(row.id));
    const csvContent = selectedData.map(row => Object.values(row).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${props.title}-export.csv`;
    a.click();
    URL.revokeObjectURL(url); // libérer le blob
  } catch (error) {
    console.error('Erreur lors de l\'exportation du CSV:', error);
  }
};
const deleteSelected = async () => {
  try {
    const selectedData = props.params.filter(row => selectedRows.value.includes(row.id));
    const selectedIds = selectedData.map(row => row.id);
    for (let i = 0; i < selectedIds.length; i++) {
      console.log(`${import.meta.env.VITE_API_BASE_URL}${props.title.toLowerCase()}/${selectedIds[i]}`)
      const response = await ky.delete(`${import.meta.env.VITE_API_BASE_URL}${props.title.toLowerCase()}/${selectedIds[i]}`).json();
      console.log(selectedIds[i])
      console.log(response)
    }
  } catch (error) {
    console.error('Erreur lors de la suppression des éléments sélectionnés:', error);
  }
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
    <div class="mx-auto max-w-screen-xl px-4 lg:px-12">
      <div class="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
        <div class="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
          <div class="w-full md:w-1/2">
            <form class="flex items-center">
              <label for="simple-search" class="sr-only">Rechercher</label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
                       viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"/>
                  </svg>
                </div>
                <input type="text" id="simple-search" v-model="searchQuery"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                       placeholder="Search" required="">
              </div>
            </form>
          </div>
          <div
              class="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
            <router-link :to="to" class="bg-black text-white py-2 px-4 font-bold rounded hover:bg-black"> Add {{ title }}
            </router-link>
            <div class="flex items-center space-x-3 w-full md:w-auto">
              <button @click="deleteSelected"
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                Delete Selected
              </button>
              <button @click="exportSelectedRows"
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Export Selected
              </button>
            </div>
          </div>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="p-4">
                <input type="checkbox" v-model="isAllSelected" @click="toggleSelectAll">
              </th>
              <th scope="col" class="px-4 py-3">#</th>
              <th scope="col" class="px-4 py-3" v-for="(param, index) in Object.keys(props.params[0] || {})"
                  :key="index">{{ param }}
              </th>
              <th scope="col" class="px-4 py-3">Actions</th>
            </tr>
            </thead>
            <tbody>

            <tr v-for="(item, index) in paginatedData" :key="item.id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td class="p-4">
                <input type="checkbox" :value="item.id" v-model="selectedRows">
              </td>
              <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {{ index + 1 }}
              </th>
              <td class="px-4 py-3" v-for="param in Object.keys(item)" :key="param">
                {{ item[param] }}
              </td>
              <td class="px-4 py-3 flex items-center space-x-3">
                <button v-for="action in actions" :key="action.label" @click="action.method({ row: item })"
                        :class="getButtonClass(action.color)" class="py-2 px-4 text-sm text-white  font-medium rounded-lg">
                  {{ action.label }}
                </button>
              </td>
            </tr>
            <tr v-if="!paginatedData.length">
              <td class="px-4 py-3 text-center" >
                No data found
              </td>
            </tr>

            </tbody>
          </table>
        </div>
        <!-- Pagination Controls -->
        <div class="flex justify-between items-center py-3 px-4">
          <button @click="previousPage" :disabled="currentPage === 1"
                  class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300">
            Previous
          </button>
          <div class="text-sm text-gray-500">Page {{ currentPage }} of {{ totalPages }}</div>
          <button @click="nextPage" :disabled="currentPage >= totalPages"
                  class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300">
            Next
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
