<script setup>
    import { ref } from 'vue';
    const isBurgerMenuOpen = ref(false);
    const openBurgerMenu = () => {
        isBurgerMenuOpen.value = !isBurgerMenuOpen.value;
    }
</script>

<template>
    <button @click="openBurgerMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="16" fill="none" viewBox="0 0 24 16">
            <path fill="#000" d="M.2 15.5v-1.875h23V15.5H.2Zm0-6.563V7.063h23v1.875H.2Zm0-6.562V.5h23v1.875H.2Z"/>
        </svg>
    </button>
    <nav v-if="isBurgerMenuOpen" class="p-4 bg-custom-red flex flex-col absolute top-0 inset-x-0 w-full h-lvh text-white items-center">
        <button @click="openBurgerMenu" class="self-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256">
                <path fill="white" d="M205.66 194.34a8 8 0 0 1-11.32 11.32L128 139.31l-66.34 66.35a8 8 0 0 1-11.32-11.32L116.69 128L50.34 61.66a8 8 0 0 1 11.32-11.32L128 116.69l66.34-66.35a8 8 0 0 1 11.32 11.32L139.31 128Z"/>
            </svg>
        </button>
        <section class="flex flex-col">
            <a href="#" class="py-2">Tapes-in</a>
            <a href="#" class="py-2">Tissages</a>
            <a href="#" class="py-2">Extension à clip</a>
            <a href="#" class="py-2">Cosmétiques</a>
        </section>
    </nav>
</template>