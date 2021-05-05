import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Switch } from 'react-native-gesture-handler'

import Button from '../components/Button'
import useUserStore from '../stores/useUserStore'
import { Container, Grid, Label, Title } from '../styled'

const More: React.FC = () => {
  const { user, logout } = useUserStore()

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

        <Switch
          // trackColor={{ false: '#767577', true: '#81b0ff' }}
          // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          // onValueChange={toggleSwitch}
          // value={isEnabled}
        />
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
    borderColor: '#ccc'
  }
})

export default More
