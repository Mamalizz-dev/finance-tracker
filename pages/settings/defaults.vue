<script setup lang="ts">

// imports

    import { z } from "zod";
    import { TIME_PERIOD_OPTIONS } from "~/constants";
    import { useMutation } from '@tanstack/vue-query'

// state

    const { toastSuccess, toastError } = useAppToast();

    const { user } = useServices()

    const settingData = ref<{transactionView: string}>({
        transactionView: user.value.user_metadata?.transaction_view ?? TIME_PERIOD_OPTIONS[1],
    });
    const form = ref<HTMLFormElement>()

    const { handleUpdateUser } = useApis()

// queries

    const { isPending: updateIsPending, mutate: updateMutate } = useMutation({
        mutationFn: (data: any) => handleUpdateUser(data)
    })

// computed

    const schema = z.object({
        transactionView: z.enum(TIME_PERIOD_OPTIONS),
    });

// methods

    const handleSubmitUpdate = async () => {
        if (form.value.errors.length) return

        const data = {
            data: {
                transaction_view: settingData.value.transactionView,
            },
        }

        updateMutate(data, {
            onSuccess: () => {
                toastSuccess({title: 'Setting updated'})
            },
            onError: (err: Error) => {
                toastError({title: 'Error in updating setting', description: err.message})
            }
        })
    };
</script>

<template>
    <UForm :state="settingData" :schema="schema" ref="form" @submit="handleSubmitUpdate">
        <UFormGroup label="Transaction View" class="mb-4" help="Choose how you would like to view transactions">
            <USelect v-model="settingData.transactionView" :options="TIME_PERIOD_OPTIONS" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" size="md" class="w-[6rem] flex-center" :loading="updateIsPending" />

    </UForm>
</template>

