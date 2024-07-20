<script setup>
import { ref } from 'vue'
defineProps({
    product: Object,
})
</script>

<template>
    <section class="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased">
        <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0">
            <div class="lg:grid lg:grid-cols-3 lg:gap-8 xl:gap-16">
                <div class="mt-6 sm:mt-8 lg:mt-0 ">
                    <div
                        class="overflow-y-auto h-screen p-6 bg-white text-left border border-[#E4E4E4] rounded dark:bg-gray-800 dark:border-gray-700">

                        <h5 class="font-medium pt-7 mb-2">Description</h5>
                        <p class="mb-2">
                            Nos extensions Tape sont confectionnées à partir de cheveux birmans et présentent une fine
                            bande auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés,
                            offrant ainsi un volume, une couleur et une longueur parfaitement harmonisés.
                            Leur texture naturellement bouclée nécessite très peu d'entretien et permet une grande
                            variété de styles. Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et
                            élégant, ou les boucler avec un fer à friser pour un style plus dynamique.
                            Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.
                        </p>

                        <h5 class="font-medium pt-7 mb-2">Entretien</h5>
                        <p class="mb-2">
                            Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous
                            mes conseils pour t'aider à y parvenir, ici.
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

                <div v-if="product && product.pictures && product.pictures.length > 0"
                    class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                    <div class="aspect-h-4 aspect-w-3  rounded-lg lg:block">
                        <img :src="product.pictures[0].url" alt="Two each of gray, white, and black shirts laying flat."
                            class="h-full w-full object-cover object-center">
                    </div>
                    <div class=" lg:grid lg:grid-cols-1 lg:gap-y-8">
                        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img :src="product.pictures[0].url" alt="Model wearing plain black basic tee."
                                class="h-full w-full object-cover object-center">
                        </div>
                        <div class="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                            <img :src="product.pictures[0].url" alt="Model wearing plain gray basic tee."
                                class="h-full w-full object-cover object-center">
                        </div>
                    </div>
                </div>

                <div class="fixed md:relative bottom-0 w-full z-50 mt-6 sm:mt-8 lg:mt-0">
                    <div
                        class="p-6 bg-white text-left border border-[#E4E4E4] rounded dark:bg-gray-800 dark:border-gray-700">
                        <form @submit.prevent="handleSubmit">
                            <div class="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <a href="#">
                                    <p v-if="product && product.category && product.category.lenght > 0"
                                        class="mb-2 text-left tracking-tight text-black dark:text-white">{{
                                            product.category[0].name }}</p>
                                </a>
                            </div>
                            <h2 class=" mb-2 text-lg font-semibold text-black sm:text-2xl dark:text-white">
                                {{ product.name }}
                            </h2>
                            <p class="mb-2 text-left tracking-tight text-black dark:text-white">{{ product.price_ttc }}
                                EUR</p>
                            <p class="my-4 font-normal text-black py-3  dark:text-gray-400 hidden md:block">
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

<style scoped></style>
