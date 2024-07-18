export default function(to: any, from: any) {
    
    const { isLoggedIn } = useServices()

    if (!isLoggedIn.value) {
        return
    } else {
        return navigateTo('/');

    }
}