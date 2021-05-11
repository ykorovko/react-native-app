import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

import LocalizationContext from '../../context/LocalizationContext'
import { Grid } from '../../styled'
import theme from '../../theme'

const { Item } = SkeletonPlaceholder

type Props = {
  loading: boolean
  balance: number
}

const Header: React.FC<Props> = ({ loading, balance }) => {
  const { t } = React.useContext(LocalizationContext)

  return (
    <View style={s.header}>
      <Grid spacing={1}>
        <Text style={s.label}>{t('screens.home.balance')}</Text>
      </Grid>

      {loading ? (
        <SkeletonPlaceholder>
          <Item width={160} height={35} borderRadius={20} />
        </SkeletonPlaceholder>
      ) : (
        <Text style={s.amount}>
          {balance.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
          })}
        </Text>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  header: {
    paddingHorizontal: 15,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: theme.palette?.primary,

    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)'
  },

  label: { fontSize: 20, color: theme.palette?.white },

  amount: {
    fontSize: 32,
    color: theme.palette?.white,
    fontWeight: 'bold'
  }
})

export default Header
