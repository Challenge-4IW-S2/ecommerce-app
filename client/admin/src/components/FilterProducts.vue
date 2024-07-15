<script setup>
import { ref, watch, defineEmits } from 'vue';
// filter by 

// order by
const OrdersValue = [
    { id: 0, name: 'Pertinence', value: 'relevance' },
    { id: 1, name: 'Prix décroissant', value: 'price_desc' },
    { id: 2, name: 'Prix croissant', value: 'price_asc' },
    { id: 3, name: 'Plus récent', value: 'date_desc' },
    { id: 4, name: 'Plus ancien', value: 'date_asc' },
];
const selectedOrder = ref('relevance')
const emitOrder = defineEmits(['order']);
watch(selectedOrder, (newValue) => {
    emitOrder('order', newValue);
    selectedOrder.value = newValue;
});
</script>

<template>
    <div class="py-4 px-5 flex justify-between">
        Filtrer les résultats
        <div class="flex gap-1">
            Trier par :
            <select v-model="selectedOrder" class="appearance-none">
                <option v-for="order in OrdersValue" :key="order.id" :value="order.value">
                    {{ order.name }}
                </option>
            </select>
        </div>
    </div>
</template>