<script setup lang="ts">
   
// imports

    import { useMutation } from '@tanstack/vue-query'

// state

    const { user } = useServices()
    const { url } = useAvatarUrl()
    const currentAvatar = ref<string>(user.value.user_metadata?.avatar_url || '')
    const { toastSuccess, toastError } = useAppToast();
    const fileInput = ref<any>();

    const { handleUploadAvatar, handleUpdateUser, handleDeleteAvatar } = useApis()

// queries

    const { isPending: uploadIsPending, mutate: uploadMutate } = useMutation({
        mutationFn: (data: {filename: string, file: File}) => handleUploadAvatar(data)
    })

    const { isPending: updateIsPending, mutate: updateMutate } = useMutation({
        mutationFn: (data: any) => handleUpdateUser(data)
    })

    const { isPending: deleteAvatarIsPending, mutate: deleteAvatarMutate } = useMutation({
        mutationFn: (filename: string) => handleDeleteAvatar(filename)
    })

// methods

    const handleSubmitAvatar = async () => {
        const file = fileInput.value.input.files[0];

        if (!file) {
            toastError({ title: "Select a file to upload first" });
            return;
        }

        const fileExt = file.name.split(".").pop();
        const filename = `${Math.ceil(Math.random() * (Number.MAX_SAFE_INTEGER - 1) + 1)}.${fileExt}`;

        uploadMutate({filename, file}, {
            onSuccess: () => {
                
                const data = {
                    data: {
                        avatar_url: filename,
                    }
                }
                
                updateMutate(data, {
                    onSuccess: () => {
                        toastSuccess({title: 'Avatar Updated Successfully'})
                    }
                })

                if(currentAvatar.value){
                    deleteAvatarMutate(currentAvatar.value)
                }
            },
            onError: () => {
                toastError({title: 'Failed to upload avatar', description: 'Please try again'})
            }
        })
    };
</script>

<template>
    <div>
        <div class="mb-4">
            <UFormGroup label="Current avatar" class="w-full" help="This would be blank by default">
                <USkeleton class="mt-2 mb-[18px] rounded-full size-20 shrink-0" v-if="uploadIsPending || updateIsPending" />
                <UAvatar v-else :src="url" size="3xl" class="mt-2" />
            </UFormGroup>
        </div>

        <div class="mb-4">
            <UFormGroup label="New avatar" class="w-full" name="avatar" help="After choosing an image click Save to actually upload the new avatar">
                <UInput type="file" ref="fileInput" />
            </UFormGroup>
        </div>

        <UButton type="submit" color="black" variant="solid" label="Save" :loading="uploadIsPending" @click="handleSubmitAvatar" />
    </div>
</template>
