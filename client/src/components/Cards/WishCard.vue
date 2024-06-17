<script setup>
    import SmallButton from '../Buttons/SmallButton.vue';
    defineProps({
        imgName: String,
        productName: String,
        productPrice: String,
        isInWishlist: Boolean
    })
</script>

<template>
    <div class="flex flex-col text-black w-32">
        <button class="border border-black flex items-center justify-center h-10 w-10 rounded-full absolute self-end">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="none" viewBox="0 0 19 16">
                <path :fill="isInWishlist ? '#C72C48' : ''" :stroke= "isInWishlist ? '#C72C48' : '#000'" stroke-linecap="round" stroke-linejoin="round" d="M17.071 9.142 11.414 14.8a2 2 0 0 1-2.828 0L2.929 9.143A5 5 0 1 1 10 2.072a5 5 0 0 1 7.071 7.07Z"/>
            </svg>
        </button>
        <img :src="`./public/${imgName}`" :alt="`Image du produit ${productName}`" width="109" height="166"/>
        <span class="font-semibold">{{ productName }}</span>
        <span class="font-light">{{ productPrice }}€</span>
        <SmallButton 
            text="Ajouter"
            bgColor="custom-red"
            textColor="white"
        />
    </div>
</template>