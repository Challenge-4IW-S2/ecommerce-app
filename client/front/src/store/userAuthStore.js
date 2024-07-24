import { defineStore } from "pinia";
import { useUserStore } from "./userStore.js";

export const useUserAuthStore = defineStore('auth', {
    state: () => ({
        isLogged: false,
        user: null
    }),
    actions: {
        setLoginStatus(isLoggedIn) {
            this.isLogged = isLoggedIn;
        },
        setUserDetails(userDetails) {
            this.user = userDetails;
        },
        getIsLoggedIn() {
            return this.isLogged;
        },
        getUserDetails() {
            return this.user;
        },
        async checkAuthStatus() {
            const userStore = useUserStore();
            if (userStore.user !== null) {
                this.setLoginStatus(true);
            } else {
                this.setLoginStatus(false);
            }
        }
    }
});