<script setup>
import Button from '../components/Buttons/Button.vue'
import WishCard from '../components/Cards/WishCard.vue'
</script>

<template>
    <section class="px-5 flex flex-col mb-2">
        <!-- wishlist -->
        <span class="font-medium text-2xl">Ma liste de favoris</span>
        <div class="flex flex-col items-center my-2">
            <Button text="Ajouter tous les produits" bgColor="" textColor="black" customStyle="border border-black" />
            <div class="my-4 grid grid-cols-2 gap-10">
                <WishCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
                    productPrice="120,99" isInWishlist />
                <WishCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
                    productPrice="120,99" isInWishlist />
                <WishCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
                    productPrice="120,99" isInWishlist />
                <WishCard imgName="placeholderimage.webp" productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
                    productPrice="120,99" isInWishlist />
            </div>
            <Button text="Voir plus" bgColor="" textColor="black" customStyle="border border-black" />
        </div>
        <!-- produits récommendés -->
        <span class="font-medium text-2xl">Recommendés pour vous</span>
        <!-- TODO: recommended products carousel and products card-->
        <div class="flex gap-2">
            <!-- trois / quatre produits sexy Recommendés pour vous -->
        </div>
    </section>
</template>