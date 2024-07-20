import { defineStore } from "pinia";

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
        }
    }
});