import '@emotion/react'

declare module '@emotion/react' {
  export interface Theme {
    palette: {
      primary: string
      secondary: string
      accent: string
      positive: string
      negative: string
      disabled: string
      borderColor: string

      white: string
    }
  }
}
