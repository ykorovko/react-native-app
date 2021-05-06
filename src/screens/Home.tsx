import { useTheme } from '@emotion/react'
import {
  Container as ContainerBase,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading
} from 'native-base'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {
  TransactionStatus,
  useTransactionsStore
} from '../stores/useTransactionsStore'
import theme from '../theme'

import Header from './home/Header'
import TransactionsList from './home/TransactionsList'

const tabs = [
  { key: TransactionStatus.executed, title: 'Executed' },
  { key: TransactionStatus.forSignature, title: 'For signature' },
  { key: TransactionStatus.processing, title: 'Processing' },
  { key: TransactionStatus.rejected, title: 'Rejected' }
]

const Payments: React.FC = () => {
  const { palette } = useTheme()

  const store = useTransactionsStore()

  React.useEffect(() => {
    store.loadTransactions()
  }, [])

  return (
    <ContainerBase>
      <Header loading={store.pending} balance={3000} />

      <Tabs
        renderTabBar={() => (
          <ScrollableTab underlineStyle={{ backgroundColor: palette.accent }} />
        )}
      >
        {tabs.map((t) => (
          <Tab
            key={t.key}
            heading={
              <TabHeading style={s.tabStyle}>
                <Text style={s.tabTextStyle}>{t.title}</Text>
              </TabHeading>
            }
          >
            <View style={s.tabContent}>
              <TransactionsList
                loading={store.pending}
                loaded={store.loaded}
                data={store.data[t.key]}
              />
            </View>
          </Tab>
        ))}
      </Tabs>
    </ContainerBase>
  )
}

const s = StyleSheet.create({
  tabStyle: {
    backgroundColor: theme.palette?.primary
  },

  tabTextStyle: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: theme.palette?.white,

    backgroundColor: theme.palette?.primary
  },

  tabContent: {
    flex: 1,
    backgroundColor: '#e9ecef'
  }
})

export default Payments
