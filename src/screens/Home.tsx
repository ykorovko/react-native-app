import { useTheme } from '@emotion/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import {
  Container as ContainerBase,
  Tab,
  Tabs,
  ScrollableTab,
  TabHeading
} from 'native-base'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { useModal } from 'react-native-use-modal-hooks'

import Modal from '../components/Modal'
import ScrollableView from '../components/ScrollableView'
import LocalizationContext from '../context/LocalizationContext'
import {
  TransactionStatus,
  useTransactionsStore
} from '../stores/useTransactionsStore'
import theme from '../theme'

import Header from './home/Header'
import TransactionsList from './home/TransactionsList'

const Home: React.FC = () => {
  const { palette } = useTheme()

  const store = useTransactionsStore()

  const { t, locale } = React.useContext(LocalizationContext)

  const [showModal, hideModal] = useModal(() => (
    <Modal
      isVisible
      title={t('screens.home.fingerprintSignin')}
      onClose={hideModal}
      onSubmit={() => AsyncStorage.setItem('localAuthEnabled', 'true')}
    />
  ))

  /**
   * Load transactions
   */
  React.useEffect(() => {
    store.loadTransactions()
  }, [])

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const compatible = await LocalAuthentication.hasHardwareAsync()
        const enabled = await AsyncStorage.getItem('localAuthEnabled')

        if (compatible && !enabled) showModal()
      } catch (e) {
        console.error(e)
      }
    }

    bootstrapAsync()
  }, [])

  const tabs = React.useMemo(
    () => [
      {
        key: TransactionStatus.executed,
        title: t('screens.home.executed')
      },
      {
        key: TransactionStatus.forSignature,
        title: t('screens.home.forSignature')
      },
      {
        key: TransactionStatus.processing,
        title: t('screens.home.processing')
      },
      { key: TransactionStatus.rejected, title: t('screens.home.rejected') }
    ],
    [locale]
  )

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
            <ScrollableView style={s.tabContent}>
              <TransactionsList
                loading={store.pending}
                loaded={store.loaded}
                data={store.data[t.key]}
              />
            </ScrollableView>
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
    backgroundColor: theme.palette?.background
  }
})

export default Home
