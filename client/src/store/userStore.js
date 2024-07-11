import { defineStore } from "pinia";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('userId')) || null,
    }),
    actions: {
        setUser(userId) {
            if (userId != null) {
                this.user = userId;
                sessionStorage.setItem('userId', JSON.stringify(userId));
            }
        },
        updateUser(userId) {
            if (userId != null) {
                this.user = userId;
                sessionStorage.setItem('userId', JSON.stringify(userId));
            }
        },
        clearUser() {
            this.user = null;
            sessionStorage.removeItem('userId');
        }
    }
})