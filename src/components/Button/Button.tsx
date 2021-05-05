import React from 'react'
import { TouchableOpacity, ActivityIndicator, View, Text } from 'react-native'

import { buttonStyles, buttonTextStyles } from './Button.styles'

type Props = {
  title: string
  onPress: () => void
  loading?: boolean
  variant?: 'primary' | 'contained' | 'accent'
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  loading,
  variant = 'primary'
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[buttonStyles.main, buttonStyles[variant]]}>
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
