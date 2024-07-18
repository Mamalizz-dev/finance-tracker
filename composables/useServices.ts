import { useStore } from '~/store/index';

export const useServices = () => {

    const store = useStore()

    const setUser = (data: any) => {
        store.setUser(data)
    }

    const user = computed(() => store.user)

    return {
        user,
        setUser
    }
}