import React from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '../components/Button'
import Switch from '../components/Switch'
import useUserStore from '../stores/useUserStore'
import { Container, Grid, Label, Title } from '../styled'
import theme from '../theme'

const More: React.FC = () => {
  const { user, updateUser, logout } = useUserStore()

  const handleSwitch = React.useCallback((value) => {
    updateUser({ oath: value })
  }, [])

  return (
    <Container>
      <View style={styles.listItem}>
        <Title>More</Title>
      </View>

      <View style={styles.listItem}>
        <Label>Fullname</Label>
        <Label>{user?.fullname}</Label>
      </View>

      <View style={styles.listItem}>
        <View>
          <Label>Phone number</Label>
        </View>

        <View>
          <Label>{user?.phone}</Label>
        </View>
      </View>

      <View style={styles.listItem}>
        <Label>2 Factor Auth</Label>

        <Switch value={!!user?.oath} onValueChange={handleSwitch} />
      </View>

      {/* <View style={styles.listItem}>
        <Label>Language</Label>
      </View> */}

      <Grid spacing={3}>
        <Button title="Logout" variant="accent" onPress={logout} />
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
