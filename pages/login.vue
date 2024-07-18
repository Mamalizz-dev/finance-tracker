<script setup lang="ts">

// imports

    import { useMutation } from '@tanstack/vue-query';
    import { z } from 'zod'

// props

    const emailIsSent = ref(false);
    
    const { handleLogin } = useApis()

// state

    const toast = useToast()

    const userInfo = ref<{email: string}>({
        email: ''
    })
    const form = ref<HTMLFormElement>()

// queries

    const { isPending, mutate } = useMutation({
        mutationFn: (email: string) => handleLogin(email),
    })

// computed

    const schema = z.object({
        email: z
            .string()
            .min(1, { message: "Please Enter your Email" })
            .email("This is not a valid email."),
    });

// methods

    const handleSubmit = () => {
        if (form.value.errors.length) return

        mutate(userInfo.value['email'], {
            onSuccess: () => {
                emailIsSent.value = true
                toast.add({
                    title: 'Email Sent Successfully',
                    description: 'Email includes login link',
                    icon: 'i-heroicons-check-circle',
                    color: 'green'
                })
            },
            onError: () => {
                toast.add({
                    title: 'Something went wrong',
                    icon: 'i-heroicons-x-circle',
                    color: 'red'
                })
            }
        })
    }

</script>

<template>
    <div class="max-w-[34rem] mx-auto">
        <Transition name="fade-up-down" mode="out-in">
            <UCard v-if="!emailIsSent" class="w-full">
                <template #header>
                    Sign-in to Finance Tracker
                </template>

                <UForm :schema="schema" :state="userInfo" ref="form" @submit="handleSubmit" class="flex flex-col gap-5">
                    <UFormGroup label="Email" name="email" class="mb-4" :required="true" help="You will receive an email with the confirmation link">
                        <UInput type="text" placeholder="Email" required size="xl" v-model="userInfo.email" />
                    </UFormGroup>

                    <UButton type="submit" variant="outline" color="white" size="xl" class="transition-all hover:bg-white/10 active:scale-95" block :loading="isPending">Sign-in</UButton>
                </UForm>
            </UCard>
            <UCard v-else class="w-full transition-all hover:ring-2 hover:!ring-green-500 hover:!ring-offset-4 ring-offset-white dark:ring-offset-gray-900">
                <template #header>
                    <div class="flex items-center justify-between w-full">
                        <span>Email has been sent</span>
                        <div class="flex items-center gap-3">
                            <span class="text-xs text-gray-500 dark:text-gray-400">
                                Not Your Email?
                            </span>
                            <UButton variant="outline" class="transition-all hover:bg-white/10 active:scale-95" @click="emailIsSent = false">Back</UButton>
                        </div>
                    </div>
                </template>

                <div class="gap-3 pb-3 text-center flex-col-center">
                    <UIcon name="i-heroicons-check-circle" class="mb-2 text-green-500 size-24" />
                    <p class="mb-4">We have sent an email to <strong>rmsil@email.com</strong> with a link to sign-in.</p>
                    <p class="text-sm"><strong class="text-green-500">Important:</strong> The link will expire in 5 minutes.</p>
                </div>
            </UCard>
        </Transition>
    </div>
</template>

