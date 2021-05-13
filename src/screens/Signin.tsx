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
import { RootStackParamList } from '../types/navigation'

type Props = StackScreenProps<RootStackParamList, 'Signin'>

type SigninInput = {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('validations.email')
    .required('validations.required'),
  password: yup
    .string()
    .min(6, 'validations.min6')
    .required('validations.required')
})

const Signin: React.FC<Props> = () => {
  const { login } = useUserStore()

  const { t } = React.useContext(LocalizationContext)

  const { control, handleSubmit, formState } = useForm<SigninInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onSubmit'
  })

  const onSubmit = React.useCallback((values: SigninInput) => {
    login(values.email, values.password)
  }, [])

  return (
    <ScrollableView>
      <FadeInView>
        <ContainerCentered>
          <Title>{t('screens.signin.title')}</Title>

          <Spacer spacing={1}>
            <TextField
              name="email"
              label={t('screens.signin.email')}
              control={control}
              inputProps={{
                textContentType: 'emailAddress'
              }}
            />
          </Spacer>

          <Spacer spacing={1}>
            <PasswordField
              name="password"
              label={t('screens.signin.password')}
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

export default Signin
