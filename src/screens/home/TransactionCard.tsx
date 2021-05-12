import { useTheme } from '@emotion/react'
import { AntDesign } from '@expo/vector-icons'
import { format } from 'date-fns'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { TextStyled } from '../../styled'

type Props = {
  title: string
  description: string
  amount: number
  date: Date
}

const TransactionCard: React.FC<Props> = ({
  title,
  description,
  amount,
  date
}) => {
  const theme = useTheme()

  return (
    <View style={styles.wrapper}>
      <View style={styles.imgWrapper}>
        <AntDesign name="arrowup" size={32} color={theme.palette.white} />
      </View>

      <View style={styles.content}>
        <TextStyled fontSize={24} bold>
          {title}
        </TextStyled>

        <TextStyled
          style={styles.description}
          ellipsizeMode="tail"
          numberOfLines={1}
        >
          {description}
        </TextStyled>
      </View>

      <View>
        <TextStyled
          style={{
            color: theme.palette.secondary,
            textAlign: 'right',
            marginBottom: 10
          }}
          bold
        >
          {amount?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            maximumFractionDigits: 0
          })}
        </TextStyled>

        <TextStyled style={{ color: theme.palette.primary }}>
          {format(date, 'dd.MM.yyyy')}
        </TextStyled>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff'
  },

  imgWrapper: {
    backgroundColor: '#3d5a80',
    opacity: 0.5,
    borderRadius: 30,
    padding: 10
  },

  description: {
    color: '#3d5a80',
    opacity: 0.5,
    marginTop: 5
  },

  content: {
    flex: 1,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)'
  }
})

export default TransactionCard
