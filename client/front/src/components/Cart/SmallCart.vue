<script setup>
    import { ref } from 'vue';
    // import OpenCart from './OpenCart.vue';
    const isCartOpen = ref(false);
    const openCart = () => {
        isCartOpen.value = !isCartOpen.value;
    }
</script>

<template>
    <button @click="openCart">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="none" viewBox="0 0 20 22">
            <path fill="#000"
                d="M1.8 21.5c-.48 0-.9-.18-1.26-.54C.18 20.6 0 20.18 0 19.7V5.3h5.1V5c0-1.26.435-2.325 1.305-3.195C7.275.935 8.34.5 9.6.5c1.26 0 2.325.435 3.195 1.305.87.87 1.305 1.935 1.305 3.195v.3h5.1v14.4c0 .48-.18.9-.54 1.26-.36.36-.78.54-1.26.54H1.8Zm0-1.8h15.6V7.1H1.8v12.6ZM6.9 5.3h5.4V5c0-.76-.26-1.4-.78-1.92S10.36 2.3 9.6 2.3s-1.4.26-1.92.78S6.9 4.24 6.9 5v.3Z" />
        </svg>
    </button>
    <div v-if="isCartOpen">
        <OpenCart :closeFunction=openCart />
    </div>
</template>