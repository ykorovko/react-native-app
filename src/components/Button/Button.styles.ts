import { StyleSheet } from 'react-native'

import theme from '../../theme'

export const buttonStyles = StyleSheet.create({
  main: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: 50,
    paddingVertical: 16,
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 8
  },

  buttonText: {
    fontSize: 18,
    color: theme.palette?.primary,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  primary: {
    borderColor: theme.palette?.primary
  },

  contained: {
    backgroundColor: theme.palette?.primary
  },

  accent: {
    color: '#fff',
    backgroundColor: theme.palette?.accent,
    borderColor: theme.palette?.accent
  }
})

export const buttonTextStyles = StyleSheet.create({
  main: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  primary: {
    color: theme.palette?.primary
  },

  contained: {
    color: theme.palette?.white
  },

  accent: {
    color: theme.palette?.white
  }
})
