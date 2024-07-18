<script setup lang="ts">

// impoprts

    import { z } from "zod";

// state

    const { user } = useServices()

    const state = ref<{name: string, email: string}>({
        name: user.value.user_metadata?.full_name || '',
        email: user.value.email,
    });

    const schema = z.object({
        name: z.string().min(2).optional(),
        email: z.string().email(),
    });
    
</script>

<template>
    <UForm :state="state" :schema="schema">
        <UFormGroup class="mb-4" label="Full Name" name="name" size="lg">
            <UInput v-model="state.name" />
        </UFormGroup>

        <UFormGroup class="mb-4" label="Email" name="email" size="lg" help="You will receive a confirmation email on both the old and the new addresses if you modify the email address">
            <UInput v-model="state.email" />
        </UFormGroup>

        <UButton type="submit" color="black" variant="solid" label="Save" :pending="isPending" />
    </UForm>
</template>

