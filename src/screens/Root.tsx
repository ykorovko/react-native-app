import AsyncStorage from '@react-native-async-storage/async-storage'
import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useModal } from 'react-native-use-modal-hooks'

import Button from '../components/Button'
import FadeInView from '../components/FadeInView'
import LanguageSwitcher from '../components/LanguageSwitcher'
import LocalizationContext from '../context/LocalizationContext'
import useUserStore from '../stores/useUserStore'
import { ContainerCentered, Grid, TextStyled, Title } from '../styled'
import { RootStackParamList } from '../types/navigation'

import LocalAuthModal from './root/LocalAuthModal'

type Props = StackScreenProps<RootStackParamList, 'Root'>

const Root: React.FC<Props> = ({ navigation }) => {
  const store = useUserStore()

  const { t } = React.useContext(LocalizationContext)

  const [showModal, hideModal] = useModal(() => (
    <LocalAuthModal
      isVisible
      onClose={hideModal}
      onSubmit={() => store.login('admin@test.com', 'password')}
      fallback={() => navigation.push('Signin')}
    />
  ))

  const handleSignin = React.useCallback(async () => {
    try {
      const touchId = await AsyncStorage.getItem('localAuthEnabled')

      if (touchId) showModal()
      else navigation.push('Signin')
    } catch (e) {
      console.error(e)
    }
  }, [])

  return (
    <>
      <FadeInView>
        <ContainerCentered>
          <Title style={{ textAlign: 'center' }}>
            {t('screens.root.title')}
          </Title>

          <TextStyled style={styles.subtitle}>
            {t('screens.root.subtitle')}
          </TextStyled>

          <Grid spacing={1}>
            <Button
              title={t('screens.root.signin')}
              variant="contained"
              onPress={handleSignin}
            />
          </Grid>

          <Grid spacing={1}>
            <Button
              title={t('screens.root.signup')}
              onPress={() => navigation.push('Signup')}
            />
          </Grid>
        </ContainerCentered>
      </FadeInView>

      <View style={styles.switcher}>
        <LanguageSwitcher />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 24
  },
  switcher: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 50
  }
})

export default Root
