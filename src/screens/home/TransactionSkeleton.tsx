import { useTheme } from '@emotion/react'
import React from 'react'
import { View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

const { Item } = SkeletonPlaceholder

const TransactionSkeleton: React.FC = () => {
  const theme = useTheme()

  return (
    <View
      style={{
        backgroundColor: theme.palette.white,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: theme.palette.disabled
      }}
    >
      <SkeletonPlaceholder>
        <Item flexDirection="row" alignItems="center">
          <Item width={60} height={60} borderRadius={50} />

          <Item marginLeft={20}>
            <Item width={220} height={20} borderRadius={10} />

            <Item marginTop={6} width={220} height={20} borderRadius={10} />
          </Item>

          <Item marginLeft={20}>
            <Item width={60} height={20} borderRadius={10} />

            <Item marginTop={6} width={60} height={20} borderRadius={10} />
          </Item>
        </Item>
      </SkeletonPlaceholder>
    </View>
  )
}

export default TransactionSkeleton
