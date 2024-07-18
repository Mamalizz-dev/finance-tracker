<script setup lang="ts">

// state

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
        }
    ];
    
</script>

<template>
    <div class="grid grid-cols-6 gap-8">
        <UVerticalNavigation :links="links" class="col-span-2" :ui="{base: 'py-2.5 mb-2'}" />
        <div class="col-span-4">
            <NuxtPage />
        </div>
    </div>
</template>
