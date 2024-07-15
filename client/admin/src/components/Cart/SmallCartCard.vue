<script setup>
    import ProductCounter from '../Inputs/ProductCounter.vue';
    defineProps({
        imgName: String,
        productName: String,
        productPrice: String,
    })
</script>

<template>
    <div class="flex text-black">
        <img :src="`./public/${imgName}`" :alt="`Image du produit ${productName}`" width="200" height="200"/>
        <div class="flex flex-col justify-between">
            <div class="flex flex-col">
                <span class="font-semibold">{{ productName }}</span>
                <span class="font-light">{{ productPrice }}€</span>
            </div>
            <div class="flex justify-between">
                <ProductCounter customStyle='w-40' />
                <button class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                        <path stroke="#000" d="M7.708 8.25v8.25m4.584-8.25v8.25m-5.5-12.375h-5.5v.23l.22.962a64.166 64.166 0 0 1 1.613 14.298v1.01h13.75v-1.01c0-4.812.54-9.607 1.613-14.298l.22-.963v-.229h-5.5m-6.416 0v-.458a3.208 3.208 0 0 1 6.416 0v.458m-6.416 0h6.416"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>