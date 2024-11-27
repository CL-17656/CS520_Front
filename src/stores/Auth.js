import { defineStore } from "pinia";

//Store token and other data fetched after login
export const useAuthenticationStore = defineStore("AuthenticationStore", {
    state: () => ({
        isAuthenticated: false,
        userId: "",
    }),
    actions: {
        login(loginId) {
            this.isAuthenticated = true;
            this.userId = loginId;
        },
        logout() {
            this.isAuthenticated = false;
            this.userId = "";
        }
    }
});
