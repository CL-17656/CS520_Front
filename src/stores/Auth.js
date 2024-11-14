import { defineStore } from "pinia"

//Store token and other data fetched after login
export const useAuthenticationStore = defineStore("AuthenticationStore", {
    state: ()=>{
        return {
            token: "123",
        }
    },
});
