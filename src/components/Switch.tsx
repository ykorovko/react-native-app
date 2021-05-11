import { useTheme } from '@emotion/react'
import React from 'react'
import { ColorValue, StyleProp, ViewStyle } from 'react-native'
import { Switch as RNSwitch } from 'react-native-gesture-handler'

type Props = {
  value: boolean
  onValueChange: (value: boolean) => void
  style?: StyleProp<ViewStyle>
  trackColor?: {
    true: ColorValue
    false: ColorValue
  }
}

const Switch: React.FC<Props> = ({
  value,
  onValueChange,
  style,
  trackColor
}) => {
  const theme = useTheme()

  return (
    <RNSwitch
      style={style}
      ios_backgroundColor={theme.palette.disabled}
      trackColor={trackColor}
      value={value}
      onValueChange={onValueChange}
    />
  )
}

export default Switch
