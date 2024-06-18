import { defineStore } from 'pinia'

export const useSearchHistoryStore = defineStore('searchHistory', {
    state: () => ({
        searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || [],
    }),
    actions: {
        addSearchHistory(search) {
            if (!this.searchHistory.includes(search)) {
                this.searchHistory.unshift(search);
                this.searchHistory = this.searchHistory.slice(0, 10);
                localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
            }
        },
        deleteSearchHistory() {
            this.searchHistory = [];
            localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory));
        },
    }
})