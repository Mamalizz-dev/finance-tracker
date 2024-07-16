<script setup lang="ts">

// props

    interface Props {
        title: string,
        amount: number,
        lastAmount: number,
        color: string,
        loading: boolean,
    }

    const props = defineProps<Props>()

    const { amount, lastAmount } = toRefs(props)

// state

    const { currency } = useCurrency(amount)

// computed

    const trendingUp = computed(() => amount.value >= lastAmount.value)

    const trendingPercentage = computed(() => {

        if (props.amount === 0 || props.lastAmount === 0) return '∞%'

        const bigger = Math.max(props.amount, props.lastAmount)
        const lower = Math.min(props.amount, props.lastAmount)

        const ratio = ((bigger - lower) / lower) * 100

        return `${Math.ceil(ratio)}%`

    })

</script>

<template>
    <div class="flex flex-col">

        <div class="font-semibold mb-0.5" :class="trendingUp ? 'green' : 'red'">{{ title }}</div>

        <div class="text-2xl font-bold text-black dark:text-white mb-2">
            <USkeleton class="h-8 w-full" v-if="loading" />
            <div v-else>{{ currency }}</div>
        </div>

        <div>
            <USkeleton class="h-6 w-full" v-if="loading" />
            <div v-else class="flex space-x-2 items-center text-sm">
                <UIcon 
                    :name="trendingUp ? 'i-heroicons-arrow-trending-up' : 'i-heroicons-arrow-trending-down'" 
                    class="w-6 h-6" 
                    :class="trendingUp ? 'green' : 'red'" 
                />
                <div class="text-gray-500 dark:text-gray-400">
                    {{ trendingPercentage }} vs last period
                </div>
            </div>
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
