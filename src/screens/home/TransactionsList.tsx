import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import { Transaction } from '../../stores/useTransactionsStore'
import { TextStyled, Grid } from '../../styled'

import TransactionCard from './TransactionCard'
import TransactionsPlaceholder from './TransactionsPlaceholder'

type Props = {
  loading: boolean
  loaded: boolean
  data: Transaction[]
}

const date = new Date()

const TransactionsList: React.FC<Props> = ({ loading, loaded, data }) => {
  const isEmpty = loaded && !data?.length

  return (
    <View style={styles.container}>
      {!isEmpty && (
        <View style={styles.heading}>
          {loading ? (
            <SkeletonPlaceholder>
              <SkeletonPlaceholder.Item
                width={160}
                height={30}
                borderRadius={20}
              />
            </SkeletonPlaceholder>
          ) : (
            <TextStyled>{format(date, 'MM.yyyy')}</TextStyled>
          )}
        </View>
      )}

      {(() => {
        if (loading) return <TransactionsPlaceholder />

        if (isEmpty)
          return (
            <Grid spacing={3}>
              <TextStyled fontSize={22} centered>
                No data
              </TextStyled>
            </Grid>
          )

        return data.map((item) => (
          <TransactionCard
            key={item.id}
            title={item.title}
            description={item.description}
            amount={item.amount}
            date={item.date}
          />
        ))
      })()}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  heading: {
    paddingHorizontal: 20,
    paddingVertical: 30
  }
})

export default TransactionsList
