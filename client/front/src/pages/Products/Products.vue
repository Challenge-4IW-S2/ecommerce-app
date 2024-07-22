<template>
  <div>
    <div>
      <Filter :filtered-products="filteredProducts" :filter-products="filterProducts" @update-price-range="updatePriceRange"/>
    </div>
    <div class="deleteFilter">
      <button v-if="isFilterActive" @click="clearFilters">Effacer les filtres</button>
    </div>
    <div class="products-container">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, watch, computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ProductCard from '@/components/Cards/ProductCard.vue';
import ky from "ky";
import Filter from '@/components/Modals/Filter.vue';

const allProducts = ref([]);
const categories = ref([]);
const router = useRouter();
const route = useRoute();
const selectedCategory = ref('');
const minPrice = ref(0);
const maxPrice = ref(999999); // Remplacement de Infinity par un nombre fini
const isDataLoaded = ref(false);

async function fetchProducts() {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/products`).json();
    allProducts.value = response;
    isDataLoaded.value = true;
    updateFiltersFromUrl();
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }
}

async function fetchCategories() {
  console.log('fetchCategories called');
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/categories`).json();
    categories.value = response;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
  checkDataLoaded();
}

function checkDataLoaded() {
  // Step 3: Check if both products and categories are loaded
  if (allProducts.value.length > 0 && categories.value.length > 0) {
    isDataLoaded.value = true; // Data is fully loaded
  }
}

const isFilterActive = computed(() => {
  // Vérifie si les valeurs sont différentes des valeurs par défaut
  const isCategoryActive = selectedCategory.value.length > 0;
  const isMinPriceActive = minPrice.value > 0;
  const isMaxPriceActive = maxPrice.value < 999999;
  return isCategoryActive || isMinPriceActive || isMaxPriceActive;
});

function updatePriceRange(min, max) {
  minPrice.value = min;
  maxPrice.value = max;
  filteredProducts.value = filterProducts();
}

function filterProducts() {
  // Retourne tous les produits si aucun filtre n'est actif
  return allProducts.value.filter(product => {
    const priceMatch = Number(product.price_ttc) >= minPrice.value && Number(product.price_ttc) <= maxPrice.value;
    const categoryMatch = selectedCategory.value.length ? selectedCategory.value.includes(product.category_id) : true;
    return priceMatch && categoryMatch;
  });
}

function applyFiltersAndCloseModal() {
  const query = {};
  if (selectedCategoryName.value) {
    query.category = selectedCategoryName.value;
  }
  if (minPrice.value) {
    query.minPrice = minPrice.value;
  }
  if (maxPrice.value !== 999999) {
    query.maxPrice = maxPrice.value;
  }
  router.push({ name: 'products', query }).catch(err => console.error('Error updating URL:', err));
  toggleModal();
}

const filteredProducts = ref(filterProducts());

async function updateFiltersFromUrl() {
  // Parse l'URL pour les filtres
  const categoryNames = route.query.categories ? route.query.categories.split(',') : [];
  const minPriceQuery = route.query.minPrice ? Number(route.query.minPrice) : 0;
  const maxPriceQuery = route.query.maxPrice ? Number(route.query.maxPrice) : 999999;

  if (!categoryNames.length && !route.query.minPrice && !route.query.maxPrice) {
    // Aucun filtre n'est présent dans l'URL, afficher tous les produits
    selectedCategory.value = [];
    minPrice.value = 0;
    maxPrice.value = 999999;
  } else {
    // Appliquer les filtres de l'URL
    if (categoryNames.length) {
      if (!categories.value.length) await fetchCategories();
      const selectedCategoryIds = categories.value
          .filter(category => categoryNames.includes(category.name))
          .map(category => category.id);
      selectedCategory.value = selectedCategoryIds;
    } else {
      selectedCategory.value = [];
    }
    minPrice.value = minPriceQuery;
    maxPrice.value = maxPriceQuery;
  }

  // Mettre à jour les produits filtrés
  filteredProducts.value = filterProducts();
}

onMounted(async () => {
  console.log('onMounted called');
  await fetchProducts()
  await fetchCategories()
  if (isDataLoaded.value) {
    await updateFiltersFromUrl()
  }
});

watch(() => route.query, () => {
  if (isDataLoaded.value) {
    updateFiltersFromUrl();
  }
}, { immediate: true });

watch([minPrice, maxPrice], () => {
  filteredProducts.value = filterProducts();
}, { immediate: true });

function clearFilters() {
  selectedCategory.value = '';
  minPrice.value = 0;
  maxPrice.value = 999999;
  // Reset the price range in the RangeSlider component if necessary
  // This might require emitting an event or directly resetting the component's state
  router.push({name: 'products'}).catch(err => console.error('Error clearing filters:', err));
}
</script>

<style scoped>
.products-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.deleteFilter {
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 5px; /* Ajustez l'espacement selon vos besoins */
  cursor: pointer;
  padding-top: 30px;
  padding-bottom: 15px;
}
</style>