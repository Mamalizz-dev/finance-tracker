<script setup lang="ts">

// imports

    import { CATEGORY_OPTIONS, TRANSACTION_OPTIONS } from '~/constants'
    import { z } from 'zod'

// emit

    const emit = defineEmits(["update:modelValue"]);

// props

    interface Props {
        modelValue: Boolean
    }


    const props = defineProps<Props>();

    const { modelValue } = toRefs(props)

// state

    const form = ref()

    const initialState = {
        type: undefined,
        amount: 0,
        created_at: undefined,
        description: undefined,
        category: undefined
    }

    const newTransactionData = ref({...initialState})

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

    const save = async () => {
        form.value.validate()
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
            <UForm :state="newTransactionData" :schema="schema" ref="form" @submit.prevent="save">
                <UFormGroup :required="true" label="Transaction Type" name="type" class="mb-4">
                    <USelect placeholder="Select the transaction type" :options="TRANSACTION_OPTIONS" v-model="newTransactionData.type" />
                </UFormGroup>

                <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
                    <UInput type="number" placeholder="Amount" v-model.number="newTransactionData.amount" />
                </UFormGroup>

                <UFormGroup label="Transaction date" :required="true" name="created_at" class="mb-4">
                    <UInput type="date" icon="i-heroicons-calendar-days-20-solid" v-model="newTransactionData.created_at" />
                </UFormGroup>

                <UFormGroup label="Description" hint="Optional" name="description" class="mb-4" v-if="newTransactionData.type === 'Expense'">
                    <UInput placeholder="Description" v-model="newTransactionData.description" />
                </UFormGroup>

                <UFormGroup :required="true" label="Category" name="category" class="mb-4">
                    <USelect placeholder="Category" :options="CATEGORY_OPTIONS" v-model="newTransactionData.category" />
                </UFormGroup>

                <UButton type="submit" color="black" variant="solid" label="Save" />
            </UForm>
        </UCard>
    </UModal>
</template>
