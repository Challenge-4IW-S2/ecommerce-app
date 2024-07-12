<script setup>
defineProps({
    percentage: {
        type: Number
    },
    max: {
        type: Number
    },
})
</script>

<template>
    <div class="progress-container">
        <div class="progress-bar" :style="{ width: `${(percentage / max) * 100}%` }"></div>
    </div>
</template>

<style>
.progress-container {
    width: 50%;
    background-color: #dddddd;
    border-radius: 8px;
    overflow: hidden;
}

.progress-bar {
    height: 10px;
    background-color: black;
    transition: width 0.3s ease;
}
</style>