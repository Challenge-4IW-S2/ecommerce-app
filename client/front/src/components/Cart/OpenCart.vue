<script setup>
import Button from '../Buttons/Button.vue';
import SmallCartCard from './SmallCartCard.vue';

defineProps({
    closeFunction: Function
})
</script>

<template>
    <div class="p-8 bg-white flex flex-col absolute top-0 right-0 w-96 h-lvh text-black items-center z-20 gap-3">
        <button @click="closeFunction" class="self-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                <path fill="black"
                    d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z" />
            </svg>
        </button>
        <div class="self-start flex justify-between items-center w-full">
            <span class="font-bold text-lg">Panier (0)</span>
            <a href="#" class="text-lg border border-black rounded-full px-4 flex justify-between items-center w-28">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="none" viewBox="0 0 19 16">
                    <path fill="" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                        d="M17.071 9.142 11.414 14.8a2 2 0 0 1-2.828 0L2.929 9.143A5 5 0 1 1 10 2.072a5 5 0 0 1 7.071 7.07Z" />
                </svg>
                <span>Wishlist</span>
            </a>
        </div>
        <div class="border-y w-full h-12 flex flex-col items-center">
            Il te manque 40€ pour profiter de la
            <span class="uppercase font-bold">livraison standard gratuite</span>
        </div>
        <!-- todo un foreach avec les produits -->
        <SmallCartCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
            productPrice="120,99" />
        <!--
        <h2 class="mb-2 text-center">Votre panier est actuellement vide.</h2>
        <span class="text-custom-gray text-center mb-2">
            Vous pouvez consulter tous les produits disponibles et acheter dans le magasin.
        </span>
        <Button text="Voir le magasin" bgColor="principal" textColor="white" customStyle="mb-4" />
        <div class="mt-auto w-full flex flex-col text-xl font-bold items-center">
            <span class="self-end">Total : 120,99€</span>
            <Button text="Commander" bgColor="principal" textColor="white" />
            <a href="#" class="text-base font-normal underline">Voir le panier</a>
        </div> -->
    </div>
</template>