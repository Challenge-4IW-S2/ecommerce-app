import {onMounted, ref} from 'vue';
import ky from "ky";
import { useRouter } from "vue-router";
import { useTable } from "./useTable";
import { useAPI } from './useAPI';


export const useEntityTable = (baseUrl,apiUrl, entityPath, actionsConfig = [], roleApiUrl = null) => {
    const router = useRouter();
    const {
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
        changeSort
    } = useTable([]);
    const actions = ref(actionsConfig.length > 0 ? actionsConfig : [
        {
            label: 'Modifier',
            method: ({ row }) => {
                console.log(row)
                router.push(`/admin/${entityPath}/${row.id}`);
            },
            color: 'blue',
        },
        {
            label: 'Supprimer',
            method: async ({ row }) => {
                console.log(row)
                try {
                    if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) {
                        return;
                    }
                    await ky.delete(`${baseUrl}/${entityPath}/${row.id}`);
                    await fetchData();
                } catch (error) {
                    console.error('Erreur lors de la suppression:', error);
                }
            },
            color: 'red',
        },
        {
            label: 'Exporter',
            method: async ({ row }) => {
                try {
                    const csv = Object.keys(row).map(key => `${key},${row[key]}`).join('\n');
                    const fileName = `${row.lastname || entityPath }-${row.firstname || 'export'}.csv`;

                    if (window.showSaveFilePicker) {
                        const fileHandle = await window.showSaveFilePicker({
                            suggestedName: fileName,
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
                    } else {
                        const blob = new Blob([csv], { type: 'text/csv' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = fileName;
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
            console.log(`${apiUrl}`)
            const response = await ky.get(`${apiUrl}`).json();
            console.log(response>0)
            if (response.length > 0) {
                data.value = response;
                if (roleApiUrl) {
                    const user_roles = await ky.get(`${roleApiUrl}`).json();
                    data.value.forEach((user) => {
                        user_roles.forEach((role) => {
                        if (user.role === role.id) {
                            user.role = role.name;
                        }
                    });
                    })
                }
            } else {
                console.log('No data found');
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    }

    onMounted(fetchData);

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
        actions,
        fetchData,
    };}