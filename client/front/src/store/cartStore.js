import { defineStore } from "pinia";
import ky from "ky";

export const useCartStore = defineStore('cart', {
    state: () => ({
        id: '',
        quantity: 0,
        devise: 'EUR',
        total: 0,
        lastModified: '',
        expiredAt: '',
    }),
    actions: {
        async initBag(user) {
            try {
                console.log(user);
                const response = await ky.post(`${import.meta.env.VITE_API_BASE_URL}/init-bag`, {
                    json: { 
                        sessionId: user 
                    },
                }).json();
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        },
    },
}
)