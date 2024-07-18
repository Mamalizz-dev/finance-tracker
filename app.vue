<script setup lang="ts">

// state

    const user = useSupabaseUser()

    const { setUser } = useServices()

// watch

    watch(user, (newValue: any) => {
        if(newValue){
            setUser(newValue)
        }
    },
    {
        immediate: true
    }
    )

</script>

<template>
    <NuxtLayout>
        <NuxtPage />
        <UNotifications />
    </NuxtLayout>
</template>
