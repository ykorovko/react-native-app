import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import LocalizationContext from '../../context/LocalizationContext'
import { Transaction } from '../../stores/useTransactionsStore'
import { TextStyled, Spacer } from '../../styled'

import TransactionCard from './TransactionCard'
import TransactionsPlaceholder from './TransactionsPlaceholder'

type Props = {
  loading: boolean
  loaded: boolean
  data: Transaction[]
}

const date = new Date()

const TransactionsList: React.FC<Props> = ({ loading, loaded, data }) => {
  const { t } = React.useContext(LocalizationContext)

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
            <Spacer spacing={3}>
              <TextStyled fontSize={22} centered>
                {t('components.TransactionsList.noData')}
              </TextStyled>
            </Spacer>
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
