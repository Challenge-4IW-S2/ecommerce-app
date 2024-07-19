// store/cart.ts
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [],
        isOpen: false,
    }),
    getters: {
        itemCount: (state) => state.items.length,
        isCartOpen: (state) => state.isOpen,
    },
    actions: {
        addToCart(product) {
            this.items.push(product)
        },
        removeFromCart(productId) {
            const index = this.items.findIndex(item => item.id === productId)
            if (index !== -1) {
                this.items.splice(index, 1)
            }
        },
        toggleCart() {
            this.isOpen = !this.isOpen
        },
        clearCart() {
            this.items = []
        }
    }
})