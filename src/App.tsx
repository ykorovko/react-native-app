import 'react-native-gesture-handler'
import { ThemeProvider } from '@emotion/react'
import { NavigationContainer } from '@react-navigation/native'
import { Root } from 'native-base'
import React from 'react'
import { Text, View } from 'react-native'

import { setNavigator } from './navigationRef'
import AuthStack from './navigators/AuthStack'
import HomeStack from './navigators/HomeStack'
import useUserStore from './stores/useUserStore'
import theme from './theme'
import { lightTheme } from './themes'

export default function App() {
  const { token, tryLocalSignin } = useUserStore()

  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      try {
        await tryLocalSignin()
      } catch (e) {
        // Restoring token failed
      } finally {
        setLoading(false)
      }
    }

    bootstrapAsync()
  }, [])

  if (loading) return <Text>Loading...</Text>

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 50
          }}
        >
          <NavigationContainer ref={setNavigator} theme={lightTheme}>
            {token ? <HomeStack /> : <AuthStack />}
          </NavigationContainer>
        </View>
      </Root>
    </ThemeProvider>
  )
}
