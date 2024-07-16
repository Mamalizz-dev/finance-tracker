<script setup>

// state

    const { currency } = useCurrency(3000);

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
    <div class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
                <UIcon name="i-heroicons-arrow-up-right" class="text-green-600 text-lg" />
                <span>Salary</span>
            </div>

            <div>
                <UBadge color="white">Category</UBadge>
            </div>
        </div>

        <div class="flex items-center justify-end space-x-5">
            <span>{{ currency }}</span>
            <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UButton color="white" variant="ghost" trailing-icon="i-heroicons-list-bullet" class="hover:ring-2 transition-all hover:ring-gray-700" />
            </UDropdown>
        </div>
    </div>
</template>


