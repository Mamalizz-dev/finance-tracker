<script setup lang="ts">

// imports

    import { CATEGORY_OPTIONS, TRANSACTION_OPTIONS } from '~/constants'
    import type { Transaction } from '~/types';
    import { z } from 'zod'
    import { useMutation, useQueryClient } from '@tanstack/vue-query';

// emit

    const emit = defineEmits(["update:modelValue"]);

// props

    interface Props {
        modelValue: Boolean
    }


    const props = defineProps<Props>();

    const { modelValue } = toRefs(props)

// state

    const queryClient = useQueryClient()
    const toast = useToast()
    const form = ref<HTMLFormElement>()

    const initialState: Transaction = {
        type: undefined,
        amount: 0,
        created_at: undefined,
        description: undefined,
        category: undefined
    }

    const newTransactionData = ref<Transaction>({...initialState})

    const { handleCreateTransaction } = useApis()

// queries

    const { isPending, mutate } = useMutation({
        mutationFn: (data: Transaction) => handleCreateTransaction(data)
    })

// computed

    const isOpen = computed({
        get: () => modelValue.value,
        set: (value: boolean) => {
            if(!value){
                emit("update:modelValue", value)
                resetForm()
            }
        },
    });

    const defaultSchema = z.object({
        created_at: z.string(),
        description: z.string().optional(),
        amount: z.number().positive('Amount needs to be more than 0')
    })

    const incomeSchema = z.object({
        type: z.literal('Income')
    })
    const expenseSchema = z.object({
        type: z.literal('Expense'),
        category: z.enum(CATEGORY_OPTIONS)
    })
    const investmentSchema = z.object({
        type: z.literal('Investment')
    })
    const savingSchema = z.object({
        type: z.literal('Saving')
    })
    const schema = z.intersection(
        z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
        defaultSchema
    )

// methods

    const save = () => {
        
        if (form.value.errors.length) return

        mutate({...newTransactionData.value}, {
            onSuccess: () => {
                toast.add({
                    title: 'Transaction Created Successfully',
                    icon: 'i-heroicons-check-circle',
                    color: 'green'
                })
                isOpen.value = false
                queryClient.resetQueries({queryKey: ['transactions']})
<<<<<<< HEAD
                window.scrollTo({top: 0})
=======
>>>>>>> d3e117fa77e35e891f25506d77f5fafb96bc811f
            },
            onError: () => {
                toast.add({
                    title: 'Failed To Delete Transaction',
                    icon: 'i-heroicons-x-mark-circle',
                    color: 'red'
                })
                isOpen.value = false
            },
        })

    }

    const resetForm = () => {
        Object.assign(newTransactionData.value, initialState)
        form.value.clear()
    }
    
</script>

<template>
    <UModal v-model="isOpen">
        <UCard>
            <template #header> Add Transaction </template>
            <UForm :state="newTransactionData" :schema="schema" ref="form" @submit="save">
                <UFormGroup required label="Transaction Type" name="type" class="mb-4">
                    <USelect placeholder="Select the transaction type" :options="TRANSACTION_OPTIONS" v-model="newTransactionData.type" />
                </UFormGroup>

                <UFormGroup label="Amount" required name="amount" class="mb-4">
                    <UInput type="number" placeholder="Amount" v-model.number="newTransactionData.amount" />
                </UFormGroup>

                <UFormGroup label="Transaction date" required name="created_at" class="mb-4">
                    <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="newTransactionData.created_at" />
                </UFormGroup>

                <UFormGroup label="Description" hint="Optional" name="description" class="mb-4" v-if="newTransactionData.type === 'Expense'">
                    <UInput placeholder="Description" v-model="newTransactionData.description" />
                </UFormGroup>

                <UFormGroup required label="Category" name="category" class="mb-4">
                    <USelect placeholder="Category" :options="CATEGORY_OPTIONS" v-model="newTransactionData.category" />
                </UFormGroup>

                <UButton type="submit" color="black" variant="solid" label="Save" :loading="isPending" />
            </UForm>
        </UCard>
    </UModal>
</template>
