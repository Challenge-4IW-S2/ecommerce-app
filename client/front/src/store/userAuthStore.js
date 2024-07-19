import { defineStore } from "pinia";

export const useUserStore = defineStore('auth', {
    state: () => ({
        isLogged: false,
        role: null
    }),
    actions: {
        aa() {

        },
    }
})