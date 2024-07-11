<script setup>
import ProductCounter from '../Inputs/ProductCounter.vue';
defineProps({
    imgName: String,
    productName: String,
    productPrice: String,
})
</script>

<template>
    <div class="flex text-black w-full py-4">
        <img :src="`./public/${imgName}`" :alt="`Image du produit ${productName}`" width="100" height="100" />
        <div class="flex flex-col w-full gap-3">
            <div class="flex justify-between">
                <span class="font-semibold text-xl">{{ productPrice }} €</span>
                <button class="">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
                        <path stroke="#000"
                            d="M7.708 8.25v8.25m4.584-8.25v8.25m-5.5-12.375h-5.5v.23l.22.962a64.166 64.166 0 0 1 1.613 14.298v1.01h13.75v-1.01c0-4.812.54-9.607 1.613-14.298l.22-.963v-.229h-5.5m-6.416 0v-.458a3.208 3.208 0 0 1 6.416 0v.458m-6.416 0h6.416" />
                    </svg>
                </button>
            </div>
            <span class="">{{ productName }}</span>
            <div class="flex justify-between">
                <ProductCounter customStyle='' />
                <button @click=''>
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" fill="none" viewBox="0 0 19 16">
                        <path fill="" stroke="#000" stroke-linecap="round" stroke-linejoin="round"
                            d="M17.071 9.142 11.414 14.8a2 2 0 0 1-2.828 0L2.929 9.143A5 5 0 1 1 10 2.072a5 5 0 0 1 7.071 7.07Z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>