// composables/useTable.js
import { ref, computed } from 'vue';

export const useTable = (initialData = []) => {
    const data = ref(initialData);
    const searchQuery = ref('');
    const selectedRows = ref([]);
    const sortKey = ref('');
    const sortOrder = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Gestion de la recherche
    const filteredData = computed(() => {
        if (!searchQuery.value) return data.value;
        return data.value.filter(row =>
            Object.values(row).some(
                value => String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
            )
        );
    });

    // Gestion du tri
    const sortedData = computed(() => {
        if (!sortKey.value) return filteredData.value;
        return [...filteredData.value].sort((a, b) => {
            const order = sortOrder.value === 'asc' ? 1 : -1;
            return a[sortKey.value] > b[sortKey.value] ? order : -order;
        });
    });

    // Gestion de la pagination
    const paginatedData = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return sortedData.value.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(sortedData.value.length / itemsPerPage.value));

    // Sélection de toutes les lignes
    const isAllSelected = computed(() => {
        return data.value.length > 0 && selectedRows.value.length === data.value.length;
    });

    const toggleSelectAll = () => {
        if (isAllSelected.value) {
            selectedRows.value = [];
        } else {
            selectedRows.value = data.value.map(row => row.id);
        }
    };

    const toggleRowSelection = (rowId) => {
        if (selectedRows.value.includes(rowId)) {
            selectedRows.value = selectedRows.value.filter(id => id !== rowId);
        } else {
            selectedRows.value.push(rowId);
        }
    };

    // Changer l'ordre de tri
    const changeSort = (key) => {
        if (sortKey.value === key) {
            sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
        } else {
            sortKey.value = key;
            sortOrder.value = 'asc';
        }
    };

    return {
        data,
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
    };
};
