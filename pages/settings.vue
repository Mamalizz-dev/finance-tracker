<script setup lang="ts">

// state

    const route = useRoute()

    const links = [
        {
            label: "Profile",
            to: "/settings/profile",
            icon: 'i-heroicons-user',
        },
        {
            label: "Avatar",
            to: "/settings/avatar",
            icon: 'i-heroicons-photo',
        },
        {
            label: "Defaults",
            to: "/settings/defaults",
            icon: 'i-heroicons-wrench-screwdriver',
        }
    ];

// life-cycle

    onMounted(() => {
        if(route.name == 'settings'){
            navigateTo('/settings/profile')
        }
    })

    
</script>

<template>
    <div class="grid grid-cols-6 gap-8">
        <UVerticalNavigation :links="links" class="col-span-2" :ui="{base: 'py-2.5 mb-2'}" />
        <div class="col-span-4">
            <NuxtPage />
        </div>
    </div>
</template>
