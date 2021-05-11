import * as Localization from 'expo-localization'
import i18n, { TranslateOptions } from 'i18n-js'
import React from 'react'

import LocalizationContext from '../context/LocalizationContext'
import en from '../locales/en'
import ru from '../locales/ru'

i18n.translations = { en, ru }

i18n.locale = Localization.locale

i18n.fallbacks = true

const LocalizationProvider: React.FC = ({ children }) => {
  const [locale, setLocale] = React.useState(Localization.locale)

  const localizationContext = React.useMemo(
    () => ({
      t: (scope: string, options?: TranslateOptions) =>
        i18n.t(scope, { locale, ...options }),
      locale,
      setLocale
    }),
    [locale]
  )

  return (
    <LocalizationContext.Provider value={localizationContext}>
      {children}
    </LocalizationContext.Provider>
  )
}

export default LocalizationProvider
