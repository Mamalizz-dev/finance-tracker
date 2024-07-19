import type { Transaction } from "~/types";

export const useApis = () => {

    const { $supabases: supabases } = useNuxtApp()
    const redirectUrl = useRuntimeConfig().public.baseUrl

    const handleGetAllTransactions = async(period: any): Promise<Transaction[]> => {
        try {
            const { data, error } = await supabases
                                                .from('transactions')
                                                .select()
                                                .gte('created_at', period.value.from.toISOString())
                                                .lte('created_at', period.value.to.toISOString())
                                                .order('created_at', {ascending: false})
            if(error) return []
            return data
        } catch (error) {
            throw error
        }
    }

    const handleCreateTransaction = async(newData: Transaction) => {
        try {
            const { data, error } = await supabases.from('transactions').upsert({...newData})
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    const handleDeleteTransaction = async(id: number) => {
        try {
            const { data, error } = await supabases.from('transactions').delete().eq('id', id)
            if(error) throw error
            return data
        } catch (error) {
            throw error
        }
    }

    const handleLogin = async(email: string) => {
        try {
            const { error } = await supabases.auth.signInWithOtp({
                email: email,
                options: {
                  emailRedirectTo: `${redirectUrl}/confirm`
                }
            })
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    const handleLogOut = async() => {
        try {
            const { error } = await supabases.auth.signOut()
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    const handleUpdateUser = async(data: any) => {
        try {
            const { error } = await supabases.auth.updateUser(data)
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    const handleUploadAvatar = async(data: {filename: string, file: File}) => {
        try {
            const { error } = await supabases.storage.from('avatars').upload(data.filename, data.file)
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    const handleDeleteAvatar = async(filename: string) => {
        try {
            const { error } = await supabases.storage.from('avatars').remove([filename])
            if(error) throw error
            return
        } catch (error) {
            throw error
        }
    }

    return {
        handleGetAllTransactions,
        handleCreateTransaction,
        handleDeleteTransaction,
        handleLogin,
        handleLogOut,
        handleUpdateUser,
        handleUploadAvatar,
        handleDeleteAvatar
    }

}