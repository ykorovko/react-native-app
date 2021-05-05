import { useTheme } from '@emotion/react'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Switch as RNSwitch } from 'react-native-gesture-handler'

type Props = {
  value: boolean
  onValueChange: (value: boolean) => void
}

const Switch: React.FC<Props> = ({ value, onValueChange }) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <RNSwitch
        ios_backgroundColor={theme.palette.disabled}
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  }
})

export default Switch
