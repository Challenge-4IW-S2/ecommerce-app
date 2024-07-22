<template>
  <div class="category-container">
    <h1>Categories</h1>
    <div class="max-w-sm">
      <div @click="dropdownOpen = !dropdownOpen" class="dropdown-button">
        {{ selectedCategoryNames.length ? selectedCategoryNames.join(', ') : 'Choisissez des catégories' }}
        <span class="arrow">&#9660;</span>
      </div>
      <div v-if="dropdownOpen" class="dropdown-content">
        <div v-for="category in categories" :key="category.id" class="dropdown-item">
          <input type="checkbox" :value="category.id" @change="toggleCategorySelection(category.id)" :checked="selectedCategories.includes(category.id)">
          {{ category.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import ky from "ky";

const categories = ref([]);
const selectedCategories = ref([]);
const dropdownOpen = ref(false);
const emit = defineEmits(['categories-selected']);

async function fetchCategories() {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/categories`).json();
    categories.value = response;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}

function toggleCategorySelection(categoryId) {
  const index = selectedCategories.value.indexOf(categoryId);
  if (index > -1) {
    selectedCategories.value.splice(index, 1);
  } else {
    selectedCategories.value.push(categoryId);
  }
  emit('categories-selected', selectedCategories.value);
}

const selectedCategoryNames = computed(() => {
  return categories.value.filter(c => selectedCategories.value.includes(c.id)).map(c => c.name);
});

onMounted(fetchCategories);
</script>

<style scoped>
.category-container {
  margin-bottom: 20px;
}

.dropdown-button {
  padding: 8px;
  background-color: #f0f0f0;
  cursor: pointer;
  border: 1px solid #ccc;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown-item:hover {
  background-color: #f1f1f1;
}

.arrow {
  float: right;
}
</style>