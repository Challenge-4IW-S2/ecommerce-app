<script setup>
import RadioInput from '../Inputs/RadioInput.vue';
</script>

<template>
    <div class="flex flex-col border border-black w-80 p-2">
        <RadioInput
            label="Adresse par défaut"
        />
        <div class="flex flex-col font-extralight text-sm p-2">
            <span>Jane Doe</span>
            <span>270 Rue du Faubourg Saint-Antoine</span>
            <span>75012 Paris</span>
            <span>France</span>
        </div>
        <div class="flex gap-44 self-center">
            <a href="#" class="text-sm underline font-normal">Modifier</a>
            <a href="#" class="text-sm underline font-normal">Supprimer</a>
        </div>
    </div>
</template>