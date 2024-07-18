<script setup lang="ts">
   
// imports

    import { useMutation } from '@tanstack/vue-query'

// state

    const { user } = useServices()
    const { toastSuccess, toastError } = useAppToast();
    const fileInput = ref<any>();

    const { handleUploadAvatar, handleUpdateUser } = useApis()

// queries

    const { isPending: uploadIsPending, mutate: uploadMutate } = useMutation({
        mutationFn: (data: {filename: string, file: File}) => handleUploadAvatar(data)
    })

    const { isPending: updateIsPending, mutate: updateMutate } = useMutation({
        mutationFn: (data: any) => handleUpdateUser(data)
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
                toastSuccess({title: 'Avatar Uploaded Successfully'})

                const data = {
                    data: {
                        avatar_url: userData.value.name,
                    }
                }


                updateMutate({

                })
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
                <USkeleton class="rounded-full size-[5rem]" v-if="" />
                <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="3xl" class="mt-2" />
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
