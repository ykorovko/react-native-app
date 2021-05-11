import React from 'react'
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle
} from 'react-native'

import wait from '../utils/wait'

type Props = {
  style?: StyleProp<ViewStyle>
}

const ScrollableView: React.FC<Props> = ({ children, style }) => {
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)

    wait(2000).then(() => setRefreshing(false))
  }, [])

  return (
    <SafeAreaView style={[s.container, style]}>
      <ScrollView
        contentContainerStyle={s.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled
        persistentScrollbar
        showsVerticalScrollIndicator
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flexGrow: 1 }
})

export default ScrollableView
