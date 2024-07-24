<script setup>
import { useAPIDelete } from '../../composables/useAPIDelete';
const props = defineProps({
    urlToSend: {
        type: String,
    }
})

const startDelete = (value) => {
    useAPIDelete(value);
}
</script>

<template>
    <button class="bg-red-500 hover:bg-red-700 py-2 px-4 text-sm text-white font-medium"
        @click="startDelete(props.urlToSend)">Supprimer</button>
</template>