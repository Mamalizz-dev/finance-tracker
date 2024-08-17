import type { Transaction } from "~/types";

export const useTrendIndicator = ({prev, current}: {prev: Transaction[], current: Transaction[]}) => {

    const income = computed(() => current.filter((t: Transaction) => t.type === 'Income'))
    const expense = computed(() => current.filter((t: Transaction) => t.type === 'Expense'))

    const investments = computed(() => current.filter((t: Transaction) => t.type === 'Investment'))
    const savings = computed(() => current.filter((t: Transaction) => t.type === 'Saving'))
    
    const prevIncome = computed(() => prev.filter((t: Transaction) => t.type === 'Income'))
    const prevExpense = computed(() => prev.filter((t: Transaction) => t.type === 'Expense'))

    const prevInvestments = computed(() => prev.filter((t: Transaction) => t.type === 'Investment'))
    const prevSavings = computed(() => prev.filter((t: Transaction) => t.type === 'Saving'))
    
    const incomeCount = computed(() => income.value.length)
    const expenseCount = computed(() => expense.value.length)

    const investmentsTotal = computed(() => investments.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const savingsTotal = computed(() => savings.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

    const incomeTotal = computed(() => income.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const expenseTotal = computed(() => expense.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

    const prevInvestmentsTotal = computed(() => prevInvestments.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const prevSavingsTotal = computed(() => prevSavings.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))

    const prevIncomeTotal = computed(() => prevIncome.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))
    const prevExpenseTotal = computed(() => prevExpense.value.reduce((sum: number, transaction: Transaction) => sum + transaction.amount, 0))



    return {
        prevIncomeTotal,
        prevExpenseTotal,
        prevInvestmentsTotal,
        prevSavingsTotal,
        incomeCount,
        expenseCount,
        incomeTotal,
        expenseTotal,
        investmentsTotal,
        savingsTotal
    }
}