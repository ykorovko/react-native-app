import { yupResolver } from '@hookform/resolvers/yup'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '../components/Button'
import FadeInView from '../components/FadeInView'
import PasswordField from '../components/PasswordField'
import TextField from '../components/TextField'
import LocalizationContext from '../context/LocalizationContext'
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

  const { t } = React.useContext(LocalizationContext)

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
    <FadeInView>
      <ContainerCentered>
        <Title>{t('screens.signup.title')}</Title>

        <Grid spacing={1}>
          <TextField
            name="fullname"
            label={t('screens.signup.fullname')}
            control={control}
            inputProps={{
              textContentType: 'name'
            }}
          />
        </Grid>

        <Grid spacing={1}>
          <TextField
            name="phone"
            label={t('screens.signup.phone')}
            control={control}
            inputProps={{
              textContentType: 'telephoneNumber'
            }}
          />
        </Grid>

        <Grid spacing={1}>
          <TextField
            name="email"
            label={t('screens.signup.email')}
            control={control}
            inputProps={{
              textContentType: 'emailAddress'
            }}
          />
        </Grid>

        <Grid spacing={1}>
          <PasswordField
            name="password"
            label={t('screens.signup.password')}
            control={control}
          />
        </Grid>

        <Grid spacing={1}>
          <PasswordField
            name="passwordConfirm"
            label={t('screens.signup.passwordConfirm')}
            control={control}
          />
        </Grid>

        <Grid spacing={1}>
          <Button
            title={t('buttons.submit')}
            variant="accent"
            loading={formState.isSubmitting}
            onPress={handleSubmit(onSubmit)}
          />
        </Grid>
      </ContainerCentered>
    </FadeInView>
  )
}

export default Signup
