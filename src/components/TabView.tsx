import React from 'react'
import { View } from 'react-native'

type Props = {
  tabLabel: string
  style?: any
}

const TabView: React.FC<Props> = ({ children, ...props }) => (
  <View {...props} style={{ flex: 1, ...props.style }}>
    {children}
  </View>
)

export default TabView
