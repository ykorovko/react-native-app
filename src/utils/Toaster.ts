import { Toast } from 'native-base'

import theme from '../theme'

const success = (text: string): void => {
  Toast.show({
    type: 'success',
    text,
    style: { backgroundColor: theme.palette?.secondary },
    textStyle: { fontSize: 18, fontWeight: '500' }
  })
}

const error = (text: string): void => {
  Toast.show({
    type: 'danger',
    text,
    style: { backgroundColor: theme.palette?.accent },
    textStyle: { fontSize: 18, fontWeight: '500' }
  })
}

export default { success, error }
