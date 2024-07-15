<script setup>
import Button from '../Buttons/Button.vue';
import SmallCartCard from './SmallCartCard.vue';

defineProps({
    closeFunction: Function
})
</script>

<template>
    <div class="p-4 bg-white flex flex-col absolute top-0 right-0 w-[90%] h-lvh text-black items-center">
        <button @click="closeFunction" class="self-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                <path fill="black"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>
        <!-- message panier vide  -->
        <h2 class="mb-2 text-center">Votre panier est actuellement vide.</h2>
        <span class="text-custom-gray text-center mb-2">
            Vous pouvez consulter tous les produits disponibles et acheter dans le magasin.
        </span>
        <Button text="Voir le magasin" bgColor="principal" textColor="white" customStyle="mb-4" />
        <!-- todo un foreach avec les produits -->
        <SmallCartCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
            productPrice="120,99" />
        <div class="mt-auto w-full flex flex-col text-xl font-bold items-center">
            <span class="self-end">Total : 120,99€</span>
            <Button text="Commander" bgColor="principal" textColor="white" />
            <a href="#" class="text-base font-normal underline">Voir le panier</a>
        </div>
    </div>
</template>