import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text, TextInputProps } from 'react-native'

import theme from '../theme'

import TextInput from './TextInput'

type Props = {
  name: string
  label: string
  control: any
  inputProps?: TextInputProps
}

type AllProps = Props

const TextField: React.FC<AllProps> = ({
  name,
  label,
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
        style={s.input}
        value={field.value}
        label={label}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        inputProps={inputProps}
      />

      {error && <Text style={s.error}>{error.message}</Text>}
    </>
  )
}

const s = StyleSheet.create({
  input: {
    marginBottom: 15
  },
  error: {
    position: 'absolute',
    bottom: 0,
    fontSize: 16,
    color: theme.palette?.negative,
    marginTop: 5
  }
})

export default TextField
