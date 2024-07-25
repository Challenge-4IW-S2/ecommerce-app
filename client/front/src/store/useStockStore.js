import { defineStore } from 'pinia';
import ky from "ky";

export const useStockStore = defineStore('stock', {
  state: () => ({
    products: [],
    lowStockThreshold: 10,
    stockHistory: {} // stockHistory[productId] = [{ date: '2023-01-01', quantity: 10 }, ...]
  }),
  actions: {
    async fetchProducts() {
      this.products = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/products`, {
        credentials: "include"
      }).json();
    },
    updateStock(productId, newStock) {
      const product = this.products.find(p => p.id === productId);
      if (product) {
        product.quantity = newStock;
        if (!this.stockHistory[productId]) {
          this.stockHistory[productId] = [];
        }
        this.stockHistory[productId].push({ date: new Date().toISOString(), quantity: newStock });
      }
    },
    setLowStockThreshold(threshold) {
      this.lowStockThreshold = threshold;
    },
    getLowStockProducts() {
      return this.products.filter(p => p.quantity <= this.lowStockThreshold);
    },
    async fetchStockHistory() {
      try {
        const response = await ky.get(`${import.meta.env.VITE_API_BASE_URL}/history`, {
          credentials: "include"
        }).json();
        this.stockHistory = response;
      } catch (error) {

      }
    }
  }
});