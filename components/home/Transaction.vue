<script setup lang="ts">

// imports

    import type { Transaction } from "~/types/index";
    import { useApis } from '~/composables/useApis'
    import { useMutation, useQueryClient } from '@tanstack/vue-query'

// props

    interface Props {
        transaction: Transaction
    }

    const props = defineProps<Props>()

    const { transaction } = toRefs(props)

// state

    const queryClient = useQueryClient()
    const toast = useToast()
    
    const { currency } = useCurrency(transaction.value['amount']);

    const items = [
        [
            {
                label: "Edit",
                icon: "i-heroicons-pencil-square-20-solid",
                click: () => console.log("Edit"),
            },
            {
                label: "Delete",
                icon: "i-heroicons-trash-20-solid",
                click: () => handleDelete()
            },
        ],
    ];

    const {
        handleDeleteTransaction
    } = useApis()
    

// queries

    const { data, isPending, mutate } = useMutation({
        mutationFn: (id: number) => handleDeleteTransaction(id)
    })

    const handleDelete = () => {
        mutate(transaction.value['id'], {
            onSuccess: () => {
                toast.add({
                    title: 'Transaction Deleted Successfully',
                    icon: 'i-heroicons-check-circle',
                    color: 'green'
                })
                queryClient.invalidateQueries({queryKey: ['transactions']})
            },
            onError: () => {
                toast.add({
                    title: 'Failed To Delete Transaction',
                    icon: 'i-heroicons-x-mark-circle',
                    color: 'red'
                })
            }
        })
    }

</script>

<template>
    <div class="grid grid-cols-2 py-4 text-gray-900 border-b border-gray-200 dark:border-gray-800 dark:text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <UIcon 
                    :name="transaction.type == 'Income' ? 'i-heroicons-arrow-up-right' : 'i-heroicons-arrow-down-right'" 
                    class="text-lg"
                    :class="transaction.type == 'Income' ? 'green' : 'red'"
                />
                <span>{{ transaction.description }}</span>
            </div>

            <div>
                <UBadge color="white" v-if="transaction.category">{{ transaction.category }}</UBadge>
            </div>
        </div>

        <div class="flex items-center justify-end space-x-5">
            <span>{{ currency }}</span>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton color="white" variant="ghost" trailing-icon="i-heroicons-list-bullet" class="transition-all hover:ring-2 hover:ring-gray-700" :loading="isPending" :disabled="isPending" />
            </UDropdown>
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

