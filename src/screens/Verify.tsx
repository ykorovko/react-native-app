import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

import Button from '../components/Button'
import TextField from '../components/TextField'
import LocalizationContext from '../context/LocalizationContext'
import useUserStore from '../stores/useUserStore'
import { ContainerCentered, Spacer, Title } from '../styled'

type VerifyInput = {
  token: string
}

const schema = yup.object().shape({
  token: yup.string().required('validations.required')
})

const Verify: React.FC = () => {
  const { verify } = useUserStore()

  const { t } = React.useContext(LocalizationContext)

  const { control, handleSubmit, formState } = useForm<VerifyInput>({
    resolver: yupResolver(schema),
    reValidateMode: 'onChange',
    mode: 'onSubmit'
  })

  const onSubmit = React.useCallback((values: VerifyInput) => {
    verify(values)
  }, [])

  return (
    <ContainerCentered>
      <Title>{t('screens.verify.title')}</Title>

      <Spacer spacing={1}>
        <TextField
          name="token"
          label={t('screens.verify.code')}
          control={control}
        />
      </Spacer>

      <Spacer spacing={1}>
        <Button
          title={t('buttons.submit')}
          variant="accent"
          loading={formState.isSubmitting}
          onPress={handleSubmit(onSubmit)}
        />
      </Spacer>
    </ContainerCentered>
  )
}

export default Verify
