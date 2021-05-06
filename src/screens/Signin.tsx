import { yupResolver } from '@hookform/resolvers/yup'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '../components/Button'
import FadeInView from '../components/FadeInView'
import TextField from '../components/TextField'
import useUserStore from '../stores/useUserStore'
import { ContainerCentered, Grid, Title } from '../styled'
import { RootStackParamList } from '../types/navigation'

type Props = StackScreenProps<RootStackParamList, 'Signin'>

type SigninInput = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

const Signin: React.FC<Props> = () => {
  const { login } = useUserStore()

  const { control, handleSubmit, formState } = useForm<SigninInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onSubmit'
  })

  const onSubmit = React.useCallback((values: SigninInput) => {
    login(values.email, values.password)
  }, [])

  return (
    <FadeInView>
      <ContainerCentered>
        <Title>Signin</Title>

        <Grid spacing={1}>
          <TextField
            name="email"
            label="Your email"
            control={control}
            inputProps={{
              textContentType: 'emailAddress'
            }}
          />
        </Grid>

        <Grid spacing={1}>
          <TextField
            name="password"
            label="Your password"
            control={control}
            inputProps={{
              secureTextEntry: true,
              textContentType: 'password'
            }}
          />
        </Grid>

        <Grid spacing={1}>
          <Button
            title="Submit"
            variant="accent"
            loading={formState.isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </Grid>
      </ContainerCentered>
    </FadeInView>
  )
}

export default Signin
