import { TranslateOptions } from 'i18n-js'
import React from 'react'

type Props = {
  t: (scope: string, options?: TranslateOptions) => string
  locale: string
  setLocale: React.Dispatch<React.SetStateAction<string>>
}

const LocalizationContext = React.createContext<Props>()

export default LocalizationContext
