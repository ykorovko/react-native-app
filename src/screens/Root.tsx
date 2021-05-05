import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet } from 'react-native'

import Button from '../components/Button'
import { ContainerCentered, Grid, TextStyled, Title } from '../styled'
import { RootStackParamList } from '../types/navigation'

type Props = StackScreenProps<RootStackParamList, 'Root'>

const Root: React.FC<Props> = ({ navigation }) => {
  return (
    <ContainerCentered>
      <Title style={{ textAlign: 'center' }}>Welcome!</Title>

      <TextStyled style={styles.subtitle}>
        You must sign in / sign up to gain access
      </TextStyled>

      <Grid spacing={1}>
        <Button
          title="Signin"
          variant="contained"
          onPress={() => navigation.push('Signin')}
        />
      </Grid>

      <Grid spacing={1}>
        <Button title="Signup" onPress={() => navigation.push('Signup')} />
      </Grid>
    </ContainerCentered>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 18,
    marginBottom: 24
  }
})

export default Root
