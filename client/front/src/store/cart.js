import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: JSON.parse(localStorage.getItem('cartItems')) || [],
        isOpen: false,
    }),
    getters: {
        itemCount: (state) => state.items.length,
        isCartOpen: (state) => state.isOpen,
        total: (state) => state.items.reduce((total, item) => total + (item.price_ttc * (item.quantity || 1)), 0),
    },
    actions: {
        addToCart(product) {
            console.log("Adding product to cart:", product);
            const existingProductIndex = this.items.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                this.items[existingProductIndex].quantity += 1;
                console.log("Product quantity updated:", this.items[existingProductIndex]);
            } else {
                this.items.push({ ...product, quantity: 1 });
            }
            this.saveCart();
        },
        removeFromCart(productId) {
            const index = this.items.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.items.splice(index, 1);
                this.saveCart();
            }
        },
        updateQuantity(productId, quantity) {
            const index = this.items.findIndex(item => item.id === productId);
            if (index !== -1) {
                this.items[index].quantity = quantity;
                this.saveCart();
            }
        },
        toggleCart() {
            this.isOpen = !this.isOpen;
        },
        clearCart() {
            this.items = [];
            this.saveCart();
        },
        saveCart() {
            localStorage.setItem('cartItems', JSON.stringify(this.items));
        },
    }
});