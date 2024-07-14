import { defineStore } from "pinia";
import ky from "ky";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('sessionId')) || null,
    }),
    actions: {
        async initSessionAndBag(sessionId) {
            try {
                if ((this.user === null && this.createAt === null) || 
                    (this.user !== null && this.createAt === null) ||
                    (this.user === null && this.createAt !== null)) {
                    this.user = sessionId;
                    sessionStorage.setItem('sessionId', JSON.stringify(sessionId));
                    await ky.post(`${import.meta.env.VITE_API_BASE_URL}/init-bag`, {
                        json: { 
                            sessionId: sessionId
                        }
                    }).json();
                }
            } catch(error) {
                console.error(error);
            }
        },
    }
})