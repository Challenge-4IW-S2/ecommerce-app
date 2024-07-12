<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import ky from 'ky';
import PictureCarousel from '../../components/Carousel/PictureCarousel.vue';
import Button from '../../components/Buttons/Button.vue';
import ProductDetails from '../../components/ProductDetails.vue';

const route = useRoute();
const slug = computed(() => route.params.slug);
let product = ref(null);

const getProduct = async () => {
    try {
        const response = await ky.get(`http://localhost:8000/product/${slug.value}`).json();
        if (response.data && response.data.length > 0) {
            product.value = response.data[0];
        } else {
            console.log('No product found');
        }
    } catch (error) {
        console.error('Failed to fetch product:', error);
    }
};

onMounted(getProduct);

const ProductDetailsArray = [
    {
        buttonTitle: 'Description',
        descriptionToggle: 'Nos extensions Tape sont confectionnées à partir de cheveux birmans et présentent une fine bande auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés, offrant ainsi un volume, une couleur et une longueur parfaitement harmonisés. <br> Leur texture naturellement bouclée nécessite très peu d\'entretien et permet une grande variété de styles.Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et élégant, ou les boucler avec un fer à friser pour un style plus dynamique. Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.',
    },
    {
        buttonTitle: 'Entretien',
        descriptionToggle: 'Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous mes conseils pour t\'aider à y parvenir, ici .',
    },
    {
        buttonTitle: 'Délais de livraison',
        descriptionToggle: '<li>France métropolitaine, Monaco, DOM-TOM : 2-3 jours ouvrés</li> <li>Europe : 2-3 jours ouvrés</li>',
    },
]
</script>

<template>
    <section v-if="product" class="flex flex-col px-2">
        <PictureCarousel :pictures="product.pictures" :name="product.name" />
        <span class="font-semibold text-sm mb-3"> {{ product.name }}</span>
        <span class="font-light text-xs mb-3"> à partir de {{ product.price_ttc }} EUR</span>
        <Button text="Ajouter" />
    </section>
    <section v-for="(details, index) in ProductDetailsArray" class="mt-2">
        <ProductDetails :buttonTitle="details.buttonTitle" :descriptionToggle="details.descriptionToggle" />
    </section>
</template>