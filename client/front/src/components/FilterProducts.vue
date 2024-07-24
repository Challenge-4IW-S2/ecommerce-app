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
import {ref, onMounted, computed, watch} from 'vue';
import ky from "ky";

const categories = ref([]);
const selectedCategories = ref([]);
const dropdownOpen = ref(false);

async function fetchCategories() {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/categories`).json();
    categories.value = response;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
}


// filter by 
// --> function for categories
let categoriesSelected = ref([]);
const isCategoriesOpen = ref(false);
const openCategories = () => {
    isCategoriesOpen.value = !isCategoriesOpen.value;
}
// const getCategories = async () => {
//     try {
//         const { results } = await useAPI('get', 'getCategories', {}, {}, '', true);
//         categories.value = results.value;
//     } catch (error) {
//         console.error(error);
//     }
// }


// --> function for prices
let priceMin = ref(0);
let priceMax = ref(0);
const getPrices = async () => {
    try {
        const { results } = await useAPI('get', 'getMinMaxPrice', {}, {}, '', true);
        priceMin.value = results.value[0].min;
        priceMax.value = results.value[0].max;

    } catch (error) {
        console.error(error);
    }
}

// --> function for inStock
let inStockSelected = ref([]);
// --> pour tester la checkbox
// console.log(inStockSelected);

// order by
const OrdersValue = [
    { id: 0, name: 'Pertinence', value: 'relevance' },
    { id: 1, name: 'Prix décroissant', value: 'price_desc' },
    { id: 2, name: 'Prix croissant', value: 'price_asc' },
    { id: 3, name: 'Plus récent', value: 'date_desc' },
    { id: 4, name: 'Plus ancien', value: 'date_asc' },
];
const selectedOrder = ref('relevance')

// onBeforeMount(() => {
//     getPrices();
// })

const deleteFilters = () => {
    categoriesSelected.value = [];
    getPrices();
}


// infos send to parent component
const emit = defineEmits(['categories', 'order', 'priceMin', 'priceMax']);
//  infos on order by
watch(selectedOrder, (newValue) => {
    emit('order', newValue);
    selectedOrder.value = newValue;
});
// infos on categories
watch(categoriesSelected, () => {
    emit('categories', categoriesSelected.value);
});
// infos on prices
watch(priceMin, () => {
    emit('priceMin', priceMin.value);
});
watch(priceMax, () => {
    emit('priceMax', priceMax.value);
  });
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

onMounted(() => {
  fetchCategories();
});

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
