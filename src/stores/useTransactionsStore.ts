import create from 'zustand'

import sleep from '../utils/sleep'

export enum TransactionStatus {
  executed = 'executed',
  forSignature = 'forSignature',
  processing = 'processing',
  rejected = 'rejected'
}

export type Transaction = {
  id: number
  status: TransactionStatus
  title: string
  description: string
  amount: number
  date: Date
}

const data: Transaction[] = [
  {
    id: 1,
    status: TransactionStatus.executed,
    title: 'McLaughlin - Weber',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the standard dummy text ever since the
  1500s`,
    amount: 3057,
    date: new Date()
  },
  {
    id: 2,
    status: TransactionStatus.executed,
    title: 'McLaughlin - Weber 2',
    description: `Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the standard dummy text ever since the
  1500s`,
    amount: 3057,
    date: new Date()
  }
]

type TransactionsStoreState = {
  pending: boolean
  loaded: boolean
  data: Transaction[]
  loadTransactions: () => void
  error?: any
}

export const useTransactionsStore = create<TransactionsStoreState>((set) => ({
  pending: false,
  loaded: false,
  data: [],
  loadTransactions: async () => {
    set({ pending: true })

    try {
      await sleep(3000)

      set({ data })
    } catch (err) {
      console.error(err)
    } finally {
      set({ pending: false, loaded: true })
    }
  }
}))

export const selectTransactionsByStatus = (
  state: TransactionsStoreState,
  status: TransactionStatus
): Transaction[] => {
  return state.data.filter((transaction) => transaction.status === status)
}
