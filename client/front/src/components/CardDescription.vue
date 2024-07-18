<script setup>
import SizeOptions from "./SizeOption.vue";
import { ref } from 'vue'
let showSizeOptions = ref(false);

// const product = {
//   href: '#',
//   breadcrumbs: [
//     { id: 1, name: 'Tapes In', href: '#' },
//     { id: 2, name: 'Deep Waves', href: '#' },
//   ],
//   images: [
//     {
//       src: '',
//       alt: '',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//       alt: 'Model wearing plain black basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//       alt: 'Model wearing plain gray basic tee.',
//     },
//     {
//       src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//       alt: 'Model wearing plain white basic tee.',
//     },
//   ],
//   colors: [
//     { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//     { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//     { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//   ],
//   sizes: [
//     { name: 'XXS', inStock: false },
//     { name: 'XS', inStock: true },
//     { name: 'S', inStock: true },
//     { name: 'M', inStock: true },
//     { name: 'L', inStock: true },
//     { name: 'XL', inStock: true },
//     { name: '2XL', inStock: true },
//     { name: '3XL', inStock: true },
//   ],
//   highlights: [
//     'Hand cut and sewn locally',
//     'Dyed with our proprietary colors',
//     'Pre-washed & pre-shrunk',
//     'Ultra-soft 100% cotton',
//   ],
//   details:
//       'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }

const toggleSizeOptions = () => {
  showSizeOptions.value = !showSizeOptions.value;
  console.log(showSizeOptions.value)

};
const handleSubmit = (event) => {
  console.log("okok")
  if (window.innerWidth >= 768) {
    // Desktop behavior: submit the form
    console.log('Form submitted');
  } else {
    event.preventDefault();
    toggleSizeOptions();
  }
};

defineProps({
  product: Object,
})
</script>

<template>
  <section class="py-8 bg-[#FAFAFA]">
    <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
      <div class="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-16">
        <div class="mt-6 sm:mt-8 lg:mt-0 ">
          <div class="overflow-y-auto h-screen p-6 bg-white text-left border border-[#E4E4E4] rounded">
            <h5 class="font-medium pt-7 mb-2">Description</h5>
            <p class="mb-2">
              Nos extensions Tape sont confectionnées à partir de cheveux birmans et présentent une fine bande
              auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés, offrant ainsi un volume,
              une couleur et une longueur parfaitement harmonisés.
              Leur texture naturellement bouclée nécessite très peu d'entretien et permet une grande variété de styles.
              Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et élégant, ou les boucler avec un
              fer à friser pour un style plus dynamique.
              Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.
            </p>

            <h5 class="font-medium pt-7 mb-2">Entretien</h5>
            <p class="mb-2">
              Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous mes conseils
              pour t'aider à y parvenir, ici.
            </p>

            <h5 class="font-medium pt-7 mb-2">Délais de livraison</h5>
            <ul class="mb-2">
              <li>
                <p class="mb-2">France métropolitaine, Monaco, DOM-TOM : 2-3 jours ouvrés</p>
              </li>
              <li>
                <p class="mb-2">Europe : 2-3 jours ouvrés</p>
              </li>
            </ul>
            <h5 class="font-medium pt-7 mb-2">Leurs avis</h5>
          </div>
        </div>


        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div class="aspect-h-4 aspect-w-3  rounded-lg lg:block">
            <img src="../assets/deepW3.svg" alt="Two each of gray, white, and black shirts laying flat."
              class="h-full w-full object-cover object-center">
          </div>
          <div class=" lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img src="../assets/deepW1.svg" alt="Model wearing plain black basic tee."
                class="h-full w-full object-cover object-center">
            </div>
            <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img src="../assets/deepW2.svg" alt="Model wearing plain gray basic tee."
                class="h-full w-full object-cover object-center">
            </div>
          </div>

        </div>
        <div class="fixed md:relative bottom-0 w-full z-50 mt-6 sm:mt-8 lg:mt-0">
          <div class="p-6 bg-white text-left border border-[#E4E4E4] rounded">
            <form @submit.prevent="handleSubmit">
              <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                <a href="#">
                  <p class="mb-2 text-left tracking-tight text-black ">{{ product.category[0].name }}</p>
                </a>
              </div>
              <h2 class=" mb-2 text-lg font-semibold text-black sm:text-2xl">
                {{ product.name }}
              </h2>
              <p class="mb-2 text-left tracking-tight text-black">{{ product.price_ttc }} EUR</p>
              <p class="my-4 font-normal text-black py-3  hidden md:block">
                {{ product.description }}
              </p>
              <!-- Sizes -->
              <div class="hidden md:block mt-4">
                <SizeOptions />
              </div>
              <div v-if="showSizeOptions" class="">
                <SizeOptions />
              </div>
              <button type="button"
                class="mt-10 flex w-full bg-principal items-center justify-center text-white rounded-md border border-transparent px-8 py-3 text-base font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Ajouter
              </button>
            </form>

            <!--<a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Read more
              <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </a>-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>