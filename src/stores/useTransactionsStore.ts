import create from 'zustand'

import wait from '../utils/wait'

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

const data = {
  [TransactionStatus.executed]: [
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
}

type TransactionsStoreState = {
  pending: boolean
  loaded: boolean
  data: { [key: string]: Transaction[] }
  loadTransactions: () => void
}

export const useTransactionsStore = create<TransactionsStoreState>((set) => ({
  pending: false,
  loaded: false,
  data: {
    [TransactionStatus.executed]: [],
    [TransactionStatus.forSignature]: [],
    [TransactionStatus.processing]: [],
    [TransactionStatus.rejected]: []
  },
  loadTransactions: async () => {
    set({ pending: true })

    try {
      await wait(3000)

      set({ data })
    } catch (err) {
      console.error(err)
    } finally {
      set({ pending: false, loaded: true })
    }
  }
}))
