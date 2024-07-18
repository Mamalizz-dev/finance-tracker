import { defineStore } from "pinia";
import { useSessionStorage } from "@vueuse/core";

export const useStore = defineStore('store', {
    state: () => ({
        user: useSessionStorage('user', {})
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