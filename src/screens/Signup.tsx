import { yupResolver } from '@hookform/resolvers/yup'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '../components/Button'
import TextField from '../components/TextField'
import useUserStore from '../stores/useUserStore'
import { ContainerCentered, Grid, Title } from '../styled'
import { RootStackParamList } from '../types/navigation'

type Props = StackScreenProps<RootStackParamList, 'Signup'>

type SignupInput = {
  fullname: string
  phone: string
  email: string
  password: string
  passwordConfirm: string
}

const schema = yup.object().shape({
  fullname: yup.string().min(6).required(),
  phone: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  passwordConfirm: yup
    .string()
    .min(6)
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    })
})

const Signup: React.FC<Props> = ({ navigation }) => {
  const { signup } = useUserStore()

  const { control, handleSubmit, formState, setError } = useForm<SignupInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onSubmit'
  })

  const onSubmit = React.useCallback(async (values: SignupInput) => {
    try {
      await signup(values)

      navigation.push('Home')
    } catch (err) {
      if (err.errors) {
        for (const [key, value] of Object.entries(err.errors)) {
          setError(key as any, {
            type: 'manual',
            message: value as string
          })
        }
      }
    }
  }, [])

  return (
    <ContainerCentered>
      <Title>Signup</Title>

      <Grid spacing={1}>
        <TextField
          name="fullname"
          placeholder="Your fullname"
          control={control}
          inputProps={{
            textContentType: 'name'
          }}
        />
      </Grid>

      <Grid spacing={1}>
        <TextField
          name="phone"
          placeholder="Your phone"
          control={control}
          inputProps={{
            textContentType: 'telephoneNumber'
          }}
        />
      </Grid>

      <Grid spacing={1}>
        <TextField
          name="email"
          placeholder="Your email"
          control={control}
          inputProps={{
            textContentType: 'emailAddress'
          }}
        />
      </Grid>

      <Grid spacing={1}>
        <TextField
          name="password"
          placeholder="Your password"
          control={control}
          inputProps={{
            secureTextEntry: true,
            textContentType: 'password'
          }}
        />
      </Grid>

      <Grid spacing={1}>
        <TextField
          name="passwordConfirm"
          placeholder="Confirm your password"
          control={control}
          inputProps={{
            secureTextEntry: true
          }}
        />
      </Grid>

      <Grid spacing={1}>
        <Button
          title="submit"
          variant="accent"
          loading={formState.isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Grid>
    </ContainerCentered>
  )
}

export default Signup
