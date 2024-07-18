<script setup lang="ts">

// imports

    import { TIME_PERIOD_OPTIONS } from '~/constants'
    import type { Transaction } from '~/types'
    import { useQuery, useQueryClient } from '@tanstack/vue-query'

// state

    const { toastError } = useAppToast()
    const queryClient = useQueryClient()

    const { user } = useServices()

    const timePeriod = ref<string>(user.value.user_metadata?.transaction_view ?? TIME_PERIOD_OPTIONS[0])
    const AddTransactionModalIsShow = ref<boolean>(false)
    const transactions = ref<Transaction[]>([])
    const prevTransactions = ref<Transaction[]>([])

    const { isLoggedIn } = useServices()
    const { current, previous } = useTimePeriod(timePeriod)

    const {
        handleGetAllTransactions
    } = useApis()

// queries

    const { isLoading: transactionsIsPending } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: (): Promise<Transaction[]> => handleGetAllTransactions(current),
        select: (data: Transaction[]) => {
            transactions.value = [...data]
        }
    })

    const { isLoading: prevTransactionsIsPending } = useQuery<Transaction[]>({
        queryKey: ['prev-transactions'],
        queryFn: (): Promise<Transaction[]> => handleGetAllTransactions(previous),
        select: (data: Transaction[]) => {
            prevTransactions.value = [...data]
        }
    })

// computed

    const sortedTransactionsByDate = computed(() => {
        
        const group: any = {}

        transactions.value.forEach((transaction: Transaction)=> {
            const date = new Date(transaction.created_at).toISOString().split('T')[0]
            if(!group[date]){
                group[date] = []
            }

            group[date].push(transaction)

        });

        return group

    })
    
    const income = computed(() => transactions.value.filter((t: Transaction) => t.type === 'Income'))
    const expense = computed(() => transactions.value.filter((t: Transaction) => t.type === 'Expense'))

    const prevIncome = computed(() => prevTransactions.value.filter((t: Transaction) => t.type === 'Income'))
    const prevExpense = computed(() => prevTransactions.value.filter((t: Transaction) => t.type === 'Expense'))
    
    const incomeCount = computed(() => income.value.length)
    const expenseCount = computed(() => expense.value.length)

    const incomeTotal = computed(() => income.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const expenseTotal = computed(() => expense.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

    const prevIncomeTotal = computed(() => prevIncome.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const prevExpenseTotal = computed(() => prevExpense.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

// methods

    const invalidData = () => {
        queryClient.resetQueries({queryKey: ['transactions']})
        queryClient.resetQueries({queryKey: ['prev-transactions']})
        window.scrollTo({top: 0})
    }

    const handleAddModal = () => {
        if(isLoggedIn.value){
            AddTransactionModalIsShow.value = true
        } else {
            toastError({title: 'Login required', description: 'You need to login to your account',})
        }
    }

</script>

<template>
    <div class="flex flex-col gap-10">

        <section class="flex items-center justify-between">
            <h1 class="text-3xl font-extrabold lg:text-4xl">
                Summary
            </h1>
            <div>
                <USelectMenu :options="TIME_PERIOD_OPTIONS" v-model="timePeriod" class="w-[8rem]" @change="invalidData" v-if="isLoggedIn" />
            </div>
        </section>
        
        <section class="grid grid-cols-2 gap-10 lg:grid-cols-4 sm:gap-16">

            <Trend color="green" title="Income" :amount="incomeTotal" :last-amount="prevIncomeTotal" :loading="transactionsIsPending || prevTransactionsIsPending" />
            <Trend color="red" title="Expense" :amount="expenseTotal" :last-amount="prevExpenseTotal" :loading="transactionsIsPending || prevTransactionsIsPending" />
            <Trend color="green" title="Investments" :amount="4000" :last-amount="3000" :loading="transactionsIsPending || prevTransactionsIsPending" />
            <Trend color="red" title="Saving" :amount="4000" :last-amount="4100" :loading="transactionsIsPending || prevTransactionsIsPending" />
            
        </section>

        <section>

            <div class="flex justify-between mb-10">
                <div>
                    <h2 class="text-xl font-extrabold">Transactions</h2>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
                    </div>
                </div>
                <div>
                    <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="handleAddModal" />
                </div>
            </div>

            <div v-if="transactionsIsPending" class="flex flex-col gap-4">
                <div class="flex justify-between w-full">
                    <USkeleton class="w-24 h-8" />
                    <div class="flex items-center gap-5">
                        <USkeleton class="w-12 h-8" />
                        <USkeleton class="w-16 h-8" />
                    </div>
                </div>
                <USkeleton v-for="i in 3" :key="i" class="w-full h-16" />
            </div>

            <div v-else-if="!transactions.length" class="w-full gap-3 border-2 border-gray-900 border-dashed rounded-lg flex-col-center h-52 dark:border-gray-600">
                <UIcon name="i-heroicons-exclamation-triangle" class="text-4xl text-gray-500 dark:text-gray-400" />
                <span class="text-sm text-gray-500 dark:text-gray-400">
                    No Data In This Time Period
                </span>
            </div>

            <div v-else v-for="(transactions, date) in sortedTransactionsByDate" :key="date">
                <DailyTransaction 
                    :date="date" 
                    :transactions="transactions" 
                />
                <Transaction 
                    v-for="transaction in transactions" 
                    :key="transaction.id" 
                    :transaction="transaction" 
                />
            </div>
            
        </section>

        <AddTransactionModal v-model="AddTransactionModalIsShow" />

    </div>
</template>

<style scoped>


</style>