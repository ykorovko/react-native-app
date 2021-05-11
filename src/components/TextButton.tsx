import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  title: string
  onPress: () => void
  disabled?: boolean
}

const TextButton: React.FC<Props> = ({ title, onPress, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View>
        <Text style={s.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    textTransform: 'uppercase',
    fontWeight: '600'
  }
})

export default TextButton
