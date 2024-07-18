export const useAppToast = () => {

// types

    interface toastProps { 
        title: string, 
        description: string | null 
    }

// state

    const toast = useToast()

    return {
        toastSuccess: ({ title, description = null }: toastProps) => {
            toast.add({
                title,
                description,
                icon: 'i-heroicons-check-circle',
                color: 'green'
            })
        },
        toastError: ({ title, description = null }: toastProps) => {
            toast.add({
                title,
                description,
                icon: 'i-heroicons-exclamation-circle',
                color: 'red'
            })
        }
    }
}