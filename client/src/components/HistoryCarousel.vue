<script setup>
import HistoryCard from './Cards/HistoryCard.vue'
</script>

<!-- TODO: faire le carousel -->
<template>
    <div class="flex gap-4">
        <HistoryCard imgName="placeholderimage.webp" status="En préparation" date="28/10/2023" nbProducts="3" />
        <HistoryCard imgName="placeholderimage.webp" status="Expédiée" date="28/10/2023" nbProducts="3" />
        <HistoryCard imgName="placeholderimage.webp" status="En transit" date="28/10/2023" nbProducts="3" />
        <HistoryCard imgName="placeholderimage.webp" status="Livrée" date="28/10/2023" nbProducts="3" />
    </div>
</template>