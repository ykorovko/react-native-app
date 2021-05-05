import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import RootScreen from '../screens/Root'
import SigninScreen from '../screens/Signin'
import SignupScreen from '../screens/Signup'
import VerifyScreen from '../screens/Verify'

const Stack = createStackNavigator()

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Verify" component={VerifyScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
