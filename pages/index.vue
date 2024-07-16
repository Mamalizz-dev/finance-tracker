<script setup lang="ts">

// imports

    import { TIME_PERIOD_OPTIONS } from '~/constants'
    import type { Transaction } from '~/types/index'

// state

    const { $supabases: supabases } = useNuxtApp()

    const timePeriod = ref<string>(TIME_PERIOD_OPTIONS[0])

// queries

    const { data: transactions, pending } = await useAsyncData('transactions', async() => {
        const { data, error, count } = await supabases.from('transactions').select()
        if(error) return []
        return data
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

            <Trend color="green" title="Income" :amount="2000" :last-amount="3000" :loading="false" />
            <Trend color="red" title="Expense" :amount="4000" :last-amount="5000" :loading="false" />
            <Trend color="green" title="Investments" :amount="4000" :last-amount="3000" :loading="false" />
            <Trend color="red" title="Saving" :amount="4000" :last-amount="4100" :loading="false" />
            
        </section>


        <section>
            
            <div v-for="(transactions, date) in sortedTransactionsByDate" :key="date">
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

    </div>
</template>

<style scoped>


</style>