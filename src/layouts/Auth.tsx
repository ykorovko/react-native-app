import React from 'react'
import { View } from 'react-native'

const AuthLayout: React.FC = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </View>
  )
}

export default AuthLayout
