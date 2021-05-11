import React from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '../components/Button'
import LanguageSwitcher from '../components/LanguageSwitcher'
import Switch from '../components/Switch'
import LocalizationContext from '../context/LocalizationContext'
import useUserStore from '../stores/useUserStore'
import { Container, Grid, Label, Title } from '../styled'
import theme from '../theme'

const More: React.FC = () => {
  const { user, updateUser, logout } = useUserStore()

  const { t } = React.useContext(LocalizationContext)

  const handleSwitch = React.useCallback((value) => {
    updateUser({ oath: value })
  }, [])

  return (
    <Container>
      <View style={styles.listItem}>
        <Title>{t('screens.more.title')}</Title>
      </View>

      <View style={styles.listItem}>
        <Label>{t('screens.more.fullname')}</Label>
        <Label>{user?.fullname}</Label>
      </View>

      <View style={styles.listItem}>
        <View>
          <Label>{t('screens.more.phone')}</Label>
        </View>

        <View>
          <Label>{user?.phone}</Label>
        </View>
      </View>

      <View style={styles.listItem}>
        <Label>{t('screens.more.auth')}</Label>

        <Switch value={!!user?.oath} onValueChange={handleSwitch} />
      </View>

      <View style={styles.listItem}>
        <Label>{t('screens.more.language')}</Label>

        <LanguageSwitcher />
      </View>

      <Grid spacing={3}>
        <Button
          title={t('screens.more.logout')}
          variant="accent"
          onPress={logout}
        />
      </Grid>
    </Container>
  )
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderColor: theme.palette?.borderColor
  }
})

export default More
