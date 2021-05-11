import { useTheme } from '@emotion/react'
import React from 'react'
import { View } from 'react-native'

import LocalizationContext from '../context/LocalizationContext'
import { TextStyled } from '../styled'

import Switch from './Switch'

const LanguageSwitcher: React.FC = () => {
  const { palette } = useTheme()

  const { t, locale, setLocale } = React.useContext(LocalizationContext)

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TextStyled fontSize={22}>
        {t('components.LanguageSwitcher.en')}
      </TextStyled>

      <Switch
        style={{ marginHorizontal: 10 }}
        value={locale === 'ru'}
        trackColor={{
          false: palette.borderColor,
          true: palette.borderColor
        }}
        onValueChange={() => setLocale(locale === 'ru' ? 'en' : 'ru')}
      />

      <TextStyled fontSize={22}>
        {t('components.LanguageSwitcher.ru')}
      </TextStyled>
    </View>
  )
}

export default LanguageSwitcher
