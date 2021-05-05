import React from 'react'
import { View } from 'react-native'

const MainLayout: React.FC = ({ children }) => {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 50 }}>
      {children}
    </View>
  )
}

export default MainLayout
