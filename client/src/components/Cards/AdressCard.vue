<script setup>
import RadioInput from '../Inputs/RadioInput.vue';
import {computed, ref} from "vue";
const props = defineProps({
  id: String,
  title: {
    type: String,
    default: 'Titre de mon input'
  },
  info: {
    type: Array,
    default: '[]'
  },
});
const selectedRows = ref([]);
const isAllSelected = computed({
  get: () => selectedRows.value.length === props.info.length,
  set: (value) => {
    if (value) {
      selectedRows.value = props.info.map(row => row.id);
    } else {
      selectedRows.value = [];
    }
  }
});
</script>

<template>
  <div v-if="info.length > 0" v-for="item in info" :key="item.id" class="flex flex-col border border-black w-80 p-2">
        <RadioInput
            label="Adresse par défaut"
        />
        <div class="flex flex-col font-extralight text-sm p-2">
            <span >{{ item }}</span>
            <span >Jane Doe</span>
            <span>270 Rue du Faubourg Saint-Antoine</span>
            <span>75012 Paris</span>
            <span>France</span>
        </div>
        <div class="flex gap-44 self-center">
            <a href="#" class="text-sm underline font-normal" @click="" >Modifier</a>
            <a href="#" class="text-sm underline font-normal" @click="" >Supprimer</a>
        </div>
    </div>
</template>