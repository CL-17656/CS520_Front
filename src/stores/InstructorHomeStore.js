import { defineStore } from "pinia";

export const useInstructorHomeStore = defineStore("instructorHomeStore", {
    state: () => ({
        pageNumber: 1,
        totalPages: 0
    }),
    persist: true,
});
