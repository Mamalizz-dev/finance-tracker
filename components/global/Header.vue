<script setup lang="ts">

// imports

    import { useMutation } from '@tanstack/vue-query';

// state

    const { toastSuccess, toastError } = useAppToast()
    const router = useRouter()
    const route = useRoute()

    const { user, isLoggedIn, setUser } = useServices()

    const items = [
        [{
            label: user.value?.email,
            slot: 'account',
            disabled: true
        }], 
        [
            {
                label: 'Settings',
                icon: 'i-heroicons-cog-8-tooth',
                onClick: () => console.log('Link to settings in the future')
            }, 
            {
                label: 'Sign out',
                icon: 'i-heroicons-arrow-left-on-rectangle',
                onClick: () => {
                    mutateLogOut(undefined, {
                        onSuccess: () => {
                            setUser({})
                            toastSuccess({title: 'Successfully Logged Out'})
                            router.push({name: 'login'})
                        }, 
                        onError: () => {
                            toastError({title: 'Failed Logged Out', description: 'Please try again'})
                        }
                    })
                }
            }
        ]
    ]

    const { handleLogOut } = useApis()

// queries

    const { isPending: isLogOutPending, mutate: mutateLogOut } = useMutation({
        mutationFn: () => handleLogOut()
    })

</script>

<template>
    <header class="flex items-center justify-between py-8">
        <NuxtLink to="/" class="text-xl font-bold"> Finance Tracker </NuxtLink>
        <div>
            <UDropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' }, width: 'w-64' }" v-if="isLoggedIn">
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" />

                <template #account="{ item }">
                    
                    <div class="w-full text-left">
                        <p class="text-xs">
                            Signed in as
                        </p>
                        <NuxtMarquee :pauseOnHover="true" :speed="10" :delay="0.5">
                            <p class="w-full mr-4 text-sm mt-0.5 text-gray-900 dark:text-white">
                                {{ item.label }}
                            </p>
                        </NuxtMarquee>
                    </div>

                </template>

                <template #item="{ item }">

                    <div class="flex items-center justify-between w-full px-1" @click="item.onClick()">
                        <span class="truncate">{{ item.label }}</span>
                        <UIcon :name="item.icon" class="flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500 ms-auto" />
                    </div>

                </template>
            </UDropdown>
            <NuxtLink v-else-if="!isLoggedIn && route.name != 'login'" :to="{name: 'login'}">
                <UButton type="submit" variant="outline" color="primary" size="md">Sign-in</UButton>
            </NuxtLink>
        </div>
    </header>
</template>

<style scoped></style>
