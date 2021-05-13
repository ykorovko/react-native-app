import { yupResolver } from '@hookform/resolvers/yup'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '../components/Button'
import FadeInView from '../components/FadeInView'
import PasswordField from '../components/PasswordField'
import ScrollableView from '../components/ScrollableView'
import TextField from '../components/TextField'
import LocalizationContext from '../context/LocalizationContext'
import useUserStore from '../stores/useUserStore'
import { ContainerCentered, Spacer, Title } from '../styled'
import { SignupInput } from '../types/inputs'
import { RootStackParamList } from '../types/navigation'

type Props = StackScreenProps<RootStackParamList, 'Signup'>

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
    <ScrollableView>
      <FadeInView>
        <ContainerCentered>
          <Title>{t('screens.signup.title')}</Title>

          <Spacer spacing={1}>
            <TextField
              name="fullname"
              label={t('screens.signup.fullname')}
              control={control}
              inputProps={{
                textContentType: 'name'
              }}
            />
          </Spacer>

          <Spacer spacing={1}>
            <TextField
              name="phone"
              label={t('screens.signup.phone')}
              control={control}
              inputProps={{
                textContentType: 'telephoneNumber',
                keyboardType: 'phone-pad'
              }}
            />
          </Spacer>

          <Spacer spacing={1}>
            <TextField
              name="email"
              label={t('screens.signup.email')}
              control={control}
              inputProps={{
                textContentType: 'emailAddress'
              }}
            />
          </Spacer>

          <Spacer spacing={1}>
            <PasswordField
              name="password"
              label={t('screens.signup.password')}
              control={control}
            />
          </Spacer>

          <Spacer spacing={1}>
            <PasswordField
              name="passwordConfirm"
              label={t('screens.signup.passwordConfirm')}
              control={control}
            />
          </Spacer>

          <Spacer spacing={2}>
            <Button
              title={t('buttons.submit')}
              variant="accent"
              loading={formState.isSubmitting}
              onPress={handleSubmit(onSubmit)}
            />
          </Spacer>
        </ContainerCentered>
      </FadeInView>
    </ScrollableView>
  )
}

export default Signup
