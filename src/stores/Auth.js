import { defineStore } from "pinia";

//Store token and other data fetched after login
export const useAuthenticationStore = defineStore("AuthenticationStore", {
    state: () => ({
        isAuthenticated: false,
        userId: "",
        userName: "",
    }),
    actions: {
        login(loginId, loginUsername) {
            this.isAuthenticated = true;
            this.userId = loginId;
            this.userName = loginUsername;
        },
        logout() {
            this.isAuthenticated = false;
            this.userId = "";
            this.userName = "";
        }
    }
});
