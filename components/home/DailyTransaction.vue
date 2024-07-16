<script setup lang="ts">

// imports

    import type { Transaction } from '~/types/index'

// props

    interface Props {
        date: String,
        transactions: Transaction[],
    }

    const props = defineProps<Props>()

    const { transactions } = toRefs(props)

    const sum = computed(() => {
        let sum = 0;

        transactions.value.forEach((transaction: Transaction) => {
            if (transaction.type === "Income") {
                sum += transaction.amount;
            } else {
                sum -= transaction.amount;
            }
        });

        return sum;
    });

    const { currency } = useCurrency(sum);
    
</script>

<template>

    <div class="grid grid-cols-2 py-4 font-bold text-gray-500 border-b border-gray-200 dark:border-gray-800 dark:text-gray-400">
        <div class="flex items-center justify-between">
            {{ date }}
        </div>

        <div class="flex items-center justify-end mr-[3.1rem]" :class="sum <= 0 ? 'red' : 'green'">
            {{ currency }}
        </div>
    </div>
    
</template>

<style scoped>

    .green {
        @apply text-green-600 dark:text-green-400;
    }
    .red {
        @apply text-red-600 dark:text-red-400;
    }

</style>

