export const useCurrency = (amount: number | string | Ref) => {

    const result = computed(() => {
        return new Intl.NumberFormat('en-IN', {style: 'currency', currency: 'USD'}).format(isRef(amount) ? amount.value : amount)
    })

    return {
        currency: result
    }
}