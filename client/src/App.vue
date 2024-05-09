<script setup>
import Header from './components/Header.vue';
import Button from './components/Buttons/Button.vue';
import SmallButton from './components/Buttons/SmallButton.vue';
import Input from './components/Inputs/Input.vue';
import CartCard from './components/Cart/CartCard.vue';
import WishCard from './components/Cards/WishCard.vue';
import HistoryCard from './components/Cards/HistoryCard.vue';
</script>

<template>
    <Header />
    <div class="flex flex-col gap-2">      
        <Button 
            text="Large Button"
            bgColor="custom-red"
            textColor="white"
            customStyle="mb-4 ml-4"
        />
        <SmallButton 
            text="Small Button"
            bgColor="custom-red"
            textColor="white"
            customStyle="mb-4 ml-4"
        />
        <Input 
            type="text"
            placeholder="Exemple input"
            required
            modelValue=""    
        />
        <CartCard 
            imgName="placeholderimage.webp"
            productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
            productPrice="120,99"
            productRef="123456789"
            productColor="Blanc"
            productSize="65"
            isInWishlist
        />
        <CartCard 
            imgName="placeholderimage.webp"
            productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
            productPrice="120,99"
            productRef="123456789"
            productColor="Blanc"
            productSize="65"
        />
        <WishCard 
            imgName="placeholderimage.webp"
            productName="Lorem ipsum adazd zefzeefez dzadadzdaz"
            productPrice="120,99"
            isInWishlist
        />
    </div>
</template>

