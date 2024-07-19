<script setup>
import Button from '../Buttons/Button.vue';

defineProps({
  closeFunction: Function
});
</script>

<template>
  <div class="p-8 bg-white flex flex-col absolute top-0 right-0 w-96 h-screen text-black items-center z-20 gap-3">
    <button @click="closeFunction" class="self-end">
      Fermer
    </button>
    <div class="self-start flex justify-between items-center w-full">
      <span class="font-bold text-lg">Votre panier</span>
      <Button text="Voir plus" />
    </div>
    <p>Ceci est un affichage basique du panier.</p>
  </div>
</template>