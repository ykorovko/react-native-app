import React from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text } from 'react-native'

import { buttonStyles, buttonTextStyles } from './Button.styles'

type Props = {
  title: string
  onPress: () => void
  loading?: boolean
  variant?: 'primary' | 'contained' | 'accent'
  disabled?: boolean
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  loading,
  variant = 'primary',
  disabled
}) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={[
          buttonStyles.main,
          buttonStyles[variant],
          disabled ? buttonStyles.disabled : {}
        ]}
      >
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <Text style={[buttonTextStyles.main, buttonTextStyles[variant]]}>
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  )
}

export default Button
