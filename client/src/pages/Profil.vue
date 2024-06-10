<script setup>
import Button from '../components/Buttons/Button.vue'
import AdressCard from '../components/Cards/AdressCard.vue'
import HistoryCarousel from '../components/HistoryCarousel.vue'
import RadioInput from '../components/Inputs/RadioInput.vue'
</script>

<template>
    <section class="px-5 flex flex-col mb-2">
        <span class="font-medium text-2xl">Bonjour, Jane Doe</span>
        <div class="flex flex-col items-center gap-4 my-3">
            <Button text="Modifier les informations" bgColor="custom-red" textColor="white" customStyle="" />
            <Button text="Changer le mot de passe" bgColor="" textColor="black" customStyle="border border-black" />
        </div>
        <span class="font-extralight text-2xl">Carnet d'adresses</span>
        <div class="flex flex-col items-center gap-4 mb-3">
            <AdressCard />
            <Button text="Ajouter une adresse" bgColor="custom-red" textColor="white" customStyle="" />
        </div>
        <span class="font-extralight text-2xl">Historique des commandes</span>
        <HistoryCarousel />
        <span class="font-extralight text-2xl">Préférence de contact</span>
        <span class="font-light text-sm">La gestion des préférences s’effectue ci-dessous : <br>
            <a href="#" class="text-sm underline font-normal">Politique de confidentialité</a>
        </span>
        <span class="font-light text-sm">J’accepte de recevoir de la communication de la part de Luzaya</span>
        <div class="self-center flex gap-1">
            <RadioInput label="Oui" />
            <RadioInput label="Non" />
        </div>
        <span class="font-extralight text-2xl">Supprimer le compte</span>
        <div class="flex flex-col items-center gap-4 my-3">
            <span class="font-light text-sm">
                Selon les conditions définies dans la politique de protection de données vous pouvez demander la
                suppression
                de votre compte à tout moment en cliquant ci-dessous.
            </span>
            <Button text="Supprimer le compte" bgColor="" textColor="black" customStyle="border border-black" />
        </div>
    </section>
</template>