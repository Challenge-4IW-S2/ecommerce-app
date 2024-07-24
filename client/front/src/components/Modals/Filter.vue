<template>
  <div>
    <div class="filter-header">
      <div @click="toggleModal($event)" class="toggle-filter">
        <span>Filtres</span>
        <svg class="w-[20px] h-[20px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M20 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6h-2m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4m16 6H10m0 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0m0 0H4"/>
        </svg>
      </div>
    </div>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-content">
        <div class="close-icon" @click="toggleModal">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <FilterProducts @categories-selected="handleCategoriesSelected" />
        <div>
          <RangePrice @update-range="handlePriceRangeUpdate" :min="minPriceToSend.value" :max="maxPriceToSend.value"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, watch} from 'vue';
import { useRouter } from 'vue-router';
import FilterProducts from "../FilterProducts.vue";
import RangePrice from "../../components/Sliders/RangePrice.vue";
import { onMounted, onUnmounted } from 'vue';
import ky from "ky";

const router = useRouter();
const isModalOpen = ref(false);
let minPriceToSend = ref(0);
let maxPriceToSend = ref(999999);
const minPrice = ref(0);
const maxPrice = ref(999999);
const selectedCategoryIds = ref([]);
const categories = ref([]);

function toggleModal(event) {
  event.stopPropagation(); // Empêche l'événement de se propager au document
  isModalOpen.value = !isModalOpen.value;
}
watch(isModalOpen, (newValue) => {
});
function closeModalOnOutsideClick(event) {
  const modalContent = document.querySelector('.modal-content');
  // Vérifie si le clic a été effectué en dehors de `.modal-content`
  if (modalContent && !modalContent.contains(event.target)) {
    isModalOpen.value = false;
  }
}
onMounted(() => {
  // Ajoute l'écouteur d'événements au `document` pour capturer tous les clics
  document.addEventListener('click', closeModalOnOutsideClick);
});
onUnmounted(() => {
  document.removeEventListener('click', closeModalOnOutsideClick);
});



onMounted(() => {
  loadData();
});
  async function loadData () {
    try {
      const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/products`).json();
      const prices = response.map(product => Number(product.price_ttc));
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      minPriceToSend.value = minPrice;
      maxPriceToSend.value = maxPrice;
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error);
    }
  }

function handlePriceRangeUpdate({ minPrice, maxPrice }) {
  minPriceToSend.value = minPrice;
  maxPriceToSend.value = maxPrice;
}

function updateUrl() {
  const newQuery = { ...router.currentRoute.query };
  if (minPrice.value !== 0 || maxPrice.value !== 999999) {
    newQuery.minPrice = minPrice.value.toString();
    newQuery.maxPrice = maxPrice.value.toString();
  } else {
    delete newQuery.minPrice;
    delete newQuery.maxPrice;
  }
  router.replace({ query: newQuery }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Error updating URL:', err);
    }
  });
}

watch([minPrice, maxPrice], () => {
  updateUrl();
}, { immediate: true });


function handleCategoriesSelected(categories) {
  selectedCategoryIds.value = categories;
  updateUrlWithCategories();
}
function updateUrlWithPrice(min, max) {
  const newQuery = { ...router.currentRoute.query, minPrice: min.toString(), maxPrice: max.toString() };
  router.replace({ query: newQuery }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Error updating URL:', err);
    }
  });
}
function updateUrlWithCategories() {
  const newQuery = { ...router.currentRoute.query, categories: selectedCategoryIds.value.join(',') };
  router.replace({ query: newQuery }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Error updating URL:', err);
    }
  });
}



/*function updatePriceRange(newRange) {
  // Définir les valeurs par défaut ou les limites de la gamme de prix
  const defaultMinPrice = 0; // La valeur minimale par défaut ou la limite de votre gamme de prix
  const defaultMaxPrice = 1000; // La valeur maximale par défaut ou la limite de votre gamme de prix

  minPrice.value = newRange[0];
  maxPrice.value = newRange[1];

  let newQuery = { ...router.currentRoute.query };

  // Vérifier si les prix correspondent aux valeurs par défaut/limites
  if (newRange[0] === defaultMinPrice && newRange[1] === defaultMaxPrice) {
    delete newQuery.minPrice;
    delete newQuery.maxPrice;
  } else {
    newQuery.minPrice = newRange[0].toString();
    newQuery.maxPrice = newRange[1].toString();
  }

  router.replace({ query: newQuery }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error('Erreur lors de la mise à jour de l\'URL:', err);
    }
  });
}*/
/*async function fetchAllCategories() {
  try {
    const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/categories`).json();
    categories.value = response; // Update the reactive variable with the fetched data
  } catch (error) {
    console.error('Failed to fetch categories:', error);
  }
  return categories.value; // Return the fetched categories
}*/


/* watch(priceRange, (newRange) => {
  updatePriceRange(newRange);
}, {deep: true});
*/
watch(selectedCategoryIds, () => {
  updateUrlWithCategories();
}, { deep: true });


</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  position: relative;
}

.toggle-filter {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px; /* Ajustez l'espacement selon vos besoins */
}

.filter-header {

  display: flex;
  align-items: center;
  justify-content: right;
  gap: 5px; /* Ajustez l'espacement selon vos besoins */
  cursor: pointer;
}

.filter-header span {
  padding-top: 4px;
}

.close-icon {
  position: absolute;
  top: 0;
  right: 0;
  padding: 10px;
  cursor: pointer;
}
</style>