import React from 'react'

import TransactionSkeleton from './TransactionSkeleton'

const placeholder = Array.from({ length: 2 })

const TransactionsPlaceholder: React.FC = () => {
  return (
    <>
      {placeholder.map((v, i) => (
        <TransactionSkeleton key={i} />
      ))}
    </>
  )
}

export default TransactionsPlaceholder
