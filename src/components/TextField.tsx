import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text } from 'react-native'

import TextInput from './TextInput'

type Props = {
  name: string
  placeholder: string
  control: any
  inputProps?: { [key: string]: any }
}

type AllProps = Props

const TextField: React.FC<AllProps> = ({
  name,
  placeholder,
  control,
  inputProps
}) => {
  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  const error = errors[name]

  return (
    <>
      <TextInput
        value={field.value}
        placeholder={placeholder}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        inputProps={inputProps}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </>
  )
}

const styles = StyleSheet.create({
  error: {
    fontSize: 16,
    color: 'red'
  }
})

export default TextField
