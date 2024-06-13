<script setup>
import { ref } from 'vue';
import ky from 'ky';
import ProductCard from '../components/Cards/ProductCard.vue';

let response = ref([]);

// get all products API
const connect = async () => {
    try {
        response = await ky.get("http://localhost:8000/products").json();
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}

connect();
</script>

<template>
    <section class="flex flex-col mb-2">
        <!-- composant filtre ici -->
        <img src="/bannerproduct.webp" alt="bannière de la page produits" class="" />
        <div v-for="(product, index) in response.data" :key="index" class="grid grid-cols-2">
            <!-- message d'erreur si pas de resultat -->
            <span v-if="response.data.length === 0" class="self-center text-custom-gray italic">
                Aucun produit disponible
            </span>
            <!-- Affichage des produits -->
             <ProductCard :productImg="product.pictures[0].url" :productName="product.name"
                :productDesc="product.description" :productPrice="product.price_ttc"
                :productCategory="product.category[0].name" />
        </div>
    </section>
</template>