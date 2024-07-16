<script setup lang="ts">

// imports

    import type { Transaction } from "~/types/index";

// props


    interface Props {
        transaction: Transaction
    }

    const props = defineProps<Props>()

    const { transaction } = toRefs(props)

// state

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
                click: () => console.log("Delete"),
            },
        ],
    ];
</script>

<template>
    <div class="grid grid-cols-2 py-4 text-gray-900 border-b border-gray-200 dark:border-gray-800 dark:text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-arrow-up-right" class="text-lg text-green-600" />
                <span>{{ transaction.description }}</span>
            </div>

            <div>
                <UBadge color="white" v-if="transaction.category">{{ transaction.category }}</UBadge>
            </div>
        </div>

        <div class="flex items-center justify-end space-x-5">
            <span>{{ currency }}</span>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton color="white" variant="ghost" trailing-icon="i-heroicons-list-bullet" class="transition-all hover:ring-2 hover:ring-gray-700" />
            </UDropdown>
        </div>
    </div>
</template>


