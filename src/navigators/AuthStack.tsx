import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import RootScreen from '../screens/Root'
import SigninScreen from '../screens/Signin'
import SignupScreen from '../screens/Signup'

const Stack = createStackNavigator()

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={RootScreen} />
      <Stack.Screen name="Signin" component={SigninScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  )
}

export default AuthStack
