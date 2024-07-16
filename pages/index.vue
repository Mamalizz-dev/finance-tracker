<script setup lang="ts">

// imports

    import { TIME_PERIOD_OPTIONS } from '~/constants'

// state

    const timePeriod = ref<string>(TIME_PERIOD_OPTIONS[0])

</script>

<template>
    <div class="flex flex-col gap-10">

        <section class="flex justify-between items-center">
            <h1 class="text-3xl lg:text-4xl font-extrabold">
                Summary
            </h1>
            <div>
                <USelectMenu :options="TIME_PERIOD_OPTIONS" v-model="timePeriod" class="w-[10rem]" />
            </div>
        </section>
        
        <section class="grid grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-16">

            <Trend color="green" title="Income" :amount="2000" :last-amount="3000" :loading="false" />
            <Trend color="red" title="Expense" :amount="4000" :last-amount="5000" :loading="false" />
            <Trend color="green" title="Investments" :amount="4000" :last-amount="3000" :loading="false" />
            <Trend color="red" title="Saving" :amount="4000" :last-amount="4100" :loading="false" />
            
        </section>


        <section>
            <Transaction />
            <Transaction />
            <Transaction />
            <Transaction />
        </section>

    </div>
</template>

<style scoped>

</style>