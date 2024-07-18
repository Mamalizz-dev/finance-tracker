import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useStore = defineStore('store', {
    state: () => ({
        user: useStorage('user', {}, sessionStorage)
    } as any),
    
    getters: {
        getUser: (state) => state.user,
    },

    actions: {
        setUser(payload: any){
            this.user = {...payload}
        },
    }
})