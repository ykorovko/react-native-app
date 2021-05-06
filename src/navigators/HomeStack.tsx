import { useTheme } from '@emotion/react'
import { AntDesign } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeScreen from '../screens/Home'
import MessagesScreen from '../screens/Messages'
import MoreScreen from '../screens/More'
import PaymentsScreen from '../screens/Payments'

const Stack = createStackNavigator()
const Tabs = createBottomTabNavigator()

const getIconName = (routeName: string): string => {
  switch (routeName) {
    case 'Home':
      return 'home'
    case 'Payments':
      return 'creditcard'
    case 'Messages':
      return 'message1'
    case 'More':
      return 'setting'
    default:
      return 'home'
  }
}

const HomeStack: React.FC = () => {
  const theme = useTheme()

  return (
    <Tabs.Navigator
      tabBarOptions={{
        activeTintColor: theme.palette.accent,
        inactiveTintColor: 'gray'
      }}
      sceneContainerStyle={{ backgroundColor: theme.palette.background }}
      screenOptions={({ route }) => ({
        size: 30,
        tabBarIcon: ({ color, size }) => {
          return (
            <AntDesign
              name={getIconName(route.name)}
              size={size}
              color={color}
            />
          )
        }
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Payments" component={PaymentsScreen} />
      <Stack.Screen name="Messages" component={MessagesScreen} />
      <Stack.Screen name="More" component={MoreScreen} />
    </Tabs.Navigator>
  )
}

export default HomeStack
