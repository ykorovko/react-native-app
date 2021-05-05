import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  TextInput as RNTextInput
} from 'react-native'

import theme from '../theme'

type Props = {
  value: string
  onChangeText: () => void
  placeholder?: string
  inputProps?: { [key: string]: any }
  onBlur?: () => void
}

const TextInput: React.FC<Props> = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
  inputProps
}) => {
  return (
    <SafeAreaView>
      <RNTextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        autoCapitalize="none"
        {...inputProps}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    minWidth: '100%',
    fontSize: 20,
    padding: 16,
    borderRadius: 4,
    backgroundColor: theme.palette?.disabled
  }
})

export default TextInput
