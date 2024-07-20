<script setup>
import { ref } from 'vue';

const isToggleOpen = ref(false);
const openToggle = () => {
    isToggleOpen.value = !isToggleOpen.value;
}

</script>

<template>
    <div></div>
    <!-- <div class="flex flex-col border-black border-t-2 px-2 py-4">
        <div class="flex justify-between">
            <span class="font-semibold text-sm md:text-base"> {{ buttonTitle }}</span>
            <button @click="openToggle">
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="11" fill="none" viewBox="0 0 19 11">
                    <path stroke="#000" d="m1 1 8.485 8.485L17.971 1" />
                </svg>
            </button>
        </div>
        <div v-if="isToggleOpen" class="mt-2 font-light text-sm md:text-base">
            <p v-html="descriptionToggle"></p>
        </div>
    </div> -->
</template>