import { MaterialIcons } from '@expo/vector-icons'
import * as LocalAuthentication from 'expo-local-authentication'
import React from 'react'
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'

import TextButton from '../../components/TextButton'
import LocalizationContext from '../../context/LocalizationContext'

type Props = {
  isVisible: boolean
  onClose: () => void
  onSubmit: () => void
  fallback: () => void
}

const alertComponent = (
  title: string,
  mess: string,
  btnTxt: string,
  btnFunc: () => void
) => {
  return Alert.alert(title, mess, [
    {
      text: btnTxt,
      onPress: btnFunc
    }
  ])
}

const LocalAuthModal: React.FC<Props> = ({
  isVisible,
  onClose,
  onSubmit,
  fallback
}) => {
  const { t } = React.useContext(LocalizationContext)

  const fallBackToDefaultAuth = React.useCallback(() => {
    onClose()
    fallback()
  }, [])

  const handleBiometricAuth = React.useCallback(async () => {
    // Check if hardware supports biometrics
    const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync()

    // Fallback to default authentication method (password) if Fingerprint is not available
    if (!isBiometricAvailable)
      return alertComponent(
        'Please enter your password',
        'Biometric Authentication not supported',
        'OK',
        fallBackToDefaultAuth
      )

    // Check Biometrics are saved locally in user's device
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync()

    if (!savedBiometrics)
      return alertComponent(
        'Biometric record not found',
        'Please login with your password',
        'OK',
        fallBackToDefaultAuth
      )

    const biometricAuth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login with Biometrics',
      cancelLabel: 'Cancel'
    })

    // console.log({ isBiometricAvailable })
    // console.log({ supportedBiometrics })
    // console.log({ savedBiometrics })
    // console.log({ biometricAuth })

    if (biometricAuth.success) onSubmit()
  }, [])

  return (
    <Modal isVisible={isVisible} style={s.container}>
      <View style={s.content}>
        <Text style={s.title}>{t('components.LocalAuthModal.title')}</Text>

        <SafeAreaView
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <TouchableOpacity onPress={handleBiometricAuth}>
            <MaterialIcons
              style={s.fingerprintButton}
              name="fingerprint"
              size={100}
              color="black"
            />
          </TouchableOpacity>

          <Text style={s.label}>{t('components.LocalAuthModal.label')}</Text>
        </SafeAreaView>

        <View style={{ justifyContent: 'flex-start' }}>
          <TextButton title={t('buttons.cancel')} onPress={onClose} />
        </View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    margin: 0
  },
  content: {
    backgroundColor: 'white',
    minHeight: '50%',
    padding: 30,
    justifyContent: 'flex-start',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  title: {
    fontSize: 30,
    fontWeight: '600'
  },
  label: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center'
  },
  fingerprintButton: {
    marginBottom: 30
  }
})

export default LocalAuthModal
