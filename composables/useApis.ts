import type { Transaction } from "~/types/index";

export const useApis = () => {

    const { $supabases: supabases } = useNuxtApp()

    const handleGetAllTransactions = async(): Promise<Transaction[]> => {
        try {
            const { data, error } = await supabases.from('transactions').select()
            if(error) return []
            return data
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

    return {
        handleGetAllTransactions,
        handleDeleteTransaction
    }

}