import { useStore } from '~/store/index';

export const useServices = () => {

    const store = useStore()

    const setUser = (data: any) => {
        store.setUser(data)
    }

    const user = computed(() => store.user)
    const isLoggedIn = computed(() => Object.keys(store.user).length > 0)

    return {
        user,
        isLoggedIn,
        setUser
    }
}