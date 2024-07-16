export default defineNuxtPlugin(() => {

    const supabases = useSupabaseClient()

    return {
        provide: {
            supabases
        }
    }

})