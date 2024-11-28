import { defineStore } from "pinia";

//Store token and other data fetched after login
export const useAuthenticationStore = defineStore("AuthenticationStore", {
    state: () => ({
        isAuthenticated: false,
        userId: "",
        userName: "",
        userType: "",
    }),
    persist: true,
    actions: {
        login(loginId, loginUsername, loginUserType) {
            this.isAuthenticated = true;
            this.userId = loginId;
            this.userName = loginUsername;
            this.userType = loginUserType;
        },
        logout() {
            this.isAuthenticated = false;
            this.userId = "";
            this.userName = "";
            this.userType = "";
        }
    }
});
