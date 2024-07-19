export const useAvatarUrl = () => {
  
    const { $supabases: supabases } = useNuxtApp()
  
    const user = useSupabaseUser()

    const getPublicUrl = () => {

      if (!user.value?.user_metadata?.avatar_url) return null
  
      const { data } = supabases
        .storage
        .from('avatars')
        .getPublicUrl(user.value?.user_metadata?.avatar_url)
  
      return data.publicUrl
    }
  
    const url = ref(getPublicUrl())
  
    watch(user, () => url.value = getPublicUrl(), { immediate: true, deep: true })
  
    return { url }
  }