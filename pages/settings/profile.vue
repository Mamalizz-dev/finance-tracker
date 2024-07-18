<script setup lang="ts">

// impoprts

    import { z } from "zod";
    import { useMutation } from "@tanstack/vue-query";

// state

    const { user } = useServices()
    const { toastSuccess, toastError } = useAppToast()

    const userData = ref<{name: string, email: string}>({
        name: user.value.user_metadata?.full_name || '',
        email: user.value.email,
    });
    const form = ref<HTMLFormElement>()

    const { handleUpdateUser } = useApis()

// queries

    const { isPending: updateIsPending, mutate: updateMutate } = useMutation({
        mutationFn: (data: any) => handleUpdateUser(data)
    })

// computed

    const schema = z.object({
        name: z.string().min(2).optional(),
        email: z.string().email(),
    });
    
// methods

    const handleSubmitUpdate = () => {
        if (form.value.errors.length) return

        const data = {
            data: {
                full_name: userData.value.name
            }
        }

        if (userData.value.email !== user.value.email) {
            data.email = userData.value.email
        }

        updateMutate(data, {
            onSuccess: () => {
                toastSuccess({title: 'Profile updated', description: 'Your profile has been updated'})
            },
            onError: (err: Error) => {
                toastError({title: 'Error updating profile', description: err.message})
            }
        })
    }

</script>

<template>
    <UForm :state="userData" :schema="schema" ref="form" @submit="handleSubmitUpdate">
        <UFormGroup class="mb-4" label="Full Name" name="name" size="lg">
            <UInput v-model="userData.name" />
        </UFormGroup>

        <UFormGroup class="mb-4" label="Email" name="email" size="lg" help="You will receive a confirmation email on both the old and the new addresses if you modify the email address">
            <UInput v-model="userData.email" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" size="md" class="w-[6rem] flex-center" :loading="updateIsPending" />
    </UForm>
</template>

