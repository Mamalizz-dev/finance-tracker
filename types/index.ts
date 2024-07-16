interface Transaction {
    id: number,
    created_at: Date,
    amount: number,
    type: string,
    description: string,
    category: string
}

export {
    type Transaction
}