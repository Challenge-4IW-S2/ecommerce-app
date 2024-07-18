<script setup>
import { ref } from 'vue'

let description = ref('');
let entretien = ref('');
const props = defineProps({
  productCategory: String,
});

switch (props.productCategory) {
  case 'Tapes-in':
    description.value = 'Nos extensions Tape sont confectionnées à partir de cheveux birmans et présentent une fine bande auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés, offrant ainsi un volume, une couleur et une longueur parfaitement harmonisés. Leur texture naturellement bouclée nécessite très peu d’entretien et permet une grande variété de styles. Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et élégant, ou les boucler avec un fer à friser pour un style plus dynamique. Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.';
    entretien.value = 'Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous mes conseils pour t’aider à y parvenir, ici.';
    break;
  case 'Tissages': 
    description.value = 'Nos tissages sont confectionnés à partir de cheveux birmans et présentent une fine bande auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés, offrant ainsi un volume, une couleur et une longueur parfaitement harmonisés. Leur texture naturellement bouclée nécessite très peu d’entretien et permet une grande variété de styles. Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et élégant, ou les boucler avec un fer à friser pour un style plus dynamique. Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.';
    entretien.value = 'Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous mes conseils pour t’aider à y parvenir, ici.';
    break;
  case 'Extension à clip':
    description.value = 'Nos extensions Tape sont confectionnées à partir de cheveux birmans et présentent une fine bande auto-adhésive avec un adhésif sécurisé. Ces cheveux sont naturellement effilés, offrant ainsi un volume, une couleur et une longueur parfaitement harmonisés. Leur texture naturellement bouclée nécessite très peu d’entretien et permet une grande variété de styles. Vous pouvez les lisser avec un fer à lisser pour obtenir un look droit et élégant, ou les boucler avec un fer à friser pour un style plus dynamique. Chaque paquet contient 20 extensions tape avec environ 50 grammes de cheveux au total.';
    entretien.value = 'Pour une pose sans défaut, il est essentiel de bien entretenir tes extensions. Voici tous mes conseils pour t’aider à y parvenir, ici.';
    break;
  case 'Cosmétiques':
    description.value = 'Découvrez notre gamme de cosmétiques naturels, conçus pour sublimer votre beauté sans compromettre votre santé. Nos produits sont formulés avec des ingrédients de la plus haute qualité, sans parabènes, sulfates, ni silicones. Parfait pour tous les types de peau, y compris les peaux sensibles.';
    entretien.value = 'Pour maintenir la qualité de nos cosmétiques, nous recommandons de les conserver dans un endroit frais et sec, à l\'abri de la lumière directe du soleil.Assurez - vous également de bien refermer les produits après utilisation.';
    break;
}
</script>

<template>
  <div class="flex flex-col text-left border border-[#E4E4E4] rounded p-6 w-[356px]">
    <h5 class="font-medium mb-2">Description</h5>
    <p class="mb-2">{{ description }}</p>
    <h5 class="font-medium mb-2">Entretien</h5>
    <p class="mb-2">{{ entretien }}</p>
    <h5 class="font-medium mb-2">Délais de livraison</h5>
    <ul class="mb-2">
      <li>
        <p class="mb-2">France métropolitaine, Monaco, DOM-TOM : 2-3 jours ouvrés</p>
      </li>
      <li>
        <p class="mb-2">Europe : 2-3 jours ouvrés</p>
      </li>
    </ul>
    <h5 class="font-medium mb-2">Leurs avis</h5>
  </div>
</template>

