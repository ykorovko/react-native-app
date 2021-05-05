import { useTheme } from '@emotion/react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ScrollableTabView, {
  ScrollableTabBar
} from 'react-native-scrollable-tab-view'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import TabView from '../components/TabView'
import {
  useTransactionsStore,
  TransactionStatus,
  selectTransactionsByStatus
} from '../stores/useTransactionsStore'
import { Grid } from '../styled'
import defaultTheme from '../theme'

import TransactionsList from './home/TransactionsList'

const tabs = [
  { key: TransactionStatus.executed, title: 'Executed' },
  { key: TransactionStatus.forSignature, title: 'For signature' },
  { key: TransactionStatus.processing, title: 'Processing' },
  { key: TransactionStatus.rejected, title: 'Rejected' }
]

const Home: React.FC = () => {
  const theme = useTheme()

  const [tabIndex, setTabIndex] = React.useState(0)

  const store = useTransactionsStore()

  React.useEffect(() => {
    store.loadTransactions()
  }, [])

  const data = React.useMemo(
    () => selectTransactionsByStatus(store, tabs[tabIndex].key),
    [tabIndex, store.data]
  )

  const onIndexChange = React.useCallback((i) => {
    setTabIndex(i)
  }, [])

  const balance = 2000

  return (
    <>
      <View style={styles.header}>
        <Grid spacing={1}>
          <Text style={{ fontSize: 20, color: theme.palette.white }}>
            Balance in dollars:
          </Text>
        </Grid>

        {store.pending ? (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={160}
              height={35}
              borderRadius={20}
            />
          </SkeletonPlaceholder>
        ) : (
          <Text
            style={{
              fontSize: 32,
              color: theme.palette.white,
              fontWeight: 'bold'
            }}
          >
            {balance.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD'
            })}
          </Text>
        )}
      </View>

      <ScrollableTabView
        style={styles.scrollableTab}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar />}
        onChangeTab={({ i }) => onIndexChange(i)}
        tabBarInactiveTextColor={theme.palette.primary}
        tabBarTextStyle={styles.tabBarText}
        tabBarActiveTextColor={theme.palette.primary}
        tabBarUnderlineStyle={{
          backgroundColor: theme.palette.accent
        }}
      >
        {tabs.map((tab) => (
          <TabView
            key={tab.key}
            tabLabel={tab.title}
            style={{ backgroundColor: '#e9ecef' }}
          >
            <TransactionsList
              loading={store.pending}
              loaded={store.loaded}
              data={data}
            />
          </TabView>
        ))}
      </ScrollableTabView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: defaultTheme.palette?.primary,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)'
  },

  scrollableTab: {
    backgroundColor: defaultTheme.palette?.primary
  },

  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.5)'
  },

  tabBarText: {
    fontSize: 20,
    textTransform: 'uppercase',
    color: defaultTheme.palette?.white
  }
})

export default Home
