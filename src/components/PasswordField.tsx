import React from 'react'
import { useController } from 'react-hook-form'
import { StyleSheet, Text, TextInputProps } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

import LocalizationContext from '../context/LocalizationContext'
import theme from '../theme'

import TextInput from './TextInput'

type Props = {
  name: string
  label: string
  control: any
  inputProps?: TextInputProps
}

type AllProps = Props

const PasswordField: React.FC<AllProps> = ({
  name,
  label,
  control,
  inputProps
}) => {
  const [isSecure, setSecure] = React.useState(true)

  const { t } = React.useContext(LocalizationContext)

  const {
    field,
    formState: { errors }
  } = useController({
    name,
    control,
    defaultValue: ''
  })

  const handleIconPress = React.useCallback(() => {
    setSecure((prevState) => !prevState)
  }, [])

  const error = errors[name]

  return (
    <>
      <TextInput
        style={s.input}
        value={field.value}
        label={label}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        inputProps={{
          ...inputProps,
          secureTextEntry: isSecure,
          textContentType: 'password'
        }}
        endAdornment={
          <Icon
            name={isSecure ? 'visibility-off' : 'visibility'}
            size={30}
            onPress={handleIconPress}
          />
        }
      />

      {error && <Text style={s.error}>{t(error.message)}</Text>}
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

export default PasswordField
