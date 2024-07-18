<script setup lang="ts">

// imports

    import { TIME_PERIOD_OPTIONS } from '~/constants'
    import type { Transaction } from '~/types'
    import { useQuery } from '@tanstack/vue-query'

// state

    const timePeriod = ref<string>(TIME_PERIOD_OPTIONS[0])
    const AddTransactionModalIsShow = ref<boolean>(false)

    const {
        handleGetAllTransactions
    } = useApis()

// queries

    const { data: transactions, isPending: isTransactionsPending } = useQuery<Transaction[]>({
        queryKey: ['transactions'],
        queryFn: (): Promise<Transaction[]> => handleGetAllTransactions()
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
    
    const incomeCount = computed(() => income.value.length)
    const expenseCount = computed(() => expense.value.length)

    const incomeTotal = computed(() => income.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const expenseTotal = computed(() => expense.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

</script>

<template>
    <div class="flex flex-col gap-10">

        <section class="flex items-center justify-between">
            <h1 class="text-3xl font-extrabold lg:text-4xl">
                Summary
            </h1>
            <div>
                <USelectMenu :options="TIME_PERIOD_OPTIONS" v-model="timePeriod" class="w-[10rem]" />
            </div>
        </section>
        
        <section class="grid grid-cols-2 gap-10 lg:grid-cols-4 sm:gap-16">

            <Trend color="green" title="Income" :amount="incomeTotal" :last-amount="4100" :loading="isTransactionsPending" />
            <Trend color="red" title="Expense" :amount="expenseTotal" :last-amount="3800" :loading="isTransactionsPending" />
            <Trend color="green" title="Investments" :amount="4000" :last-amount="3000" :loading="isTransactionsPending" />
            <Trend color="red" title="Saving" :amount="4000" :last-amount="4100" :loading="isTransactionsPending" />
            
        </section>

        <section>

            <section class="flex justify-between mb-10">
                <div>
                    <h2 class="text-xl font-extrabold">Transactions</h2>
                    <div class="text-sm text-gray-500 dark:text-gray-400">
                        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this period
                    </div>
                </div>
                <div>
                    <UButton icon="i-heroicons-plus-circle" color="white" variant="solid" label="Add" @click="AddTransactionModalIsShow = true" />
                </div>
            </section>

            <div v-if="isTransactionsPending" class="flex flex-col gap-4">
                <div class="flex justify-between w-full">
                    <USkeleton class="w-24 h-8" />
                    <div class="flex items-center gap-5">
                        <USkeleton class="w-12 h-8" />
                        <USkeleton class="w-16 h-8" />
                    </div>
                </div>
                <USkeleton v-for="i in 3" :key="i" class="w-full h-16" />
            </div>

            <div v-else v-for="(transactions, date) in sortedTransactionsByDate" class="mb-5" :key="date">
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