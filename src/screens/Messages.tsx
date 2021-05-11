import React from 'react'

import ScrollableView from '../components/ScrollableView'
import { Container, Grid, Title } from '../styled'

const Messages: React.FC = () => {
  return (
    <Container>
      <ScrollableView>
        <Grid spacing={1}>
          <Title>Messages</Title>
        </Grid>
      </ScrollableView>
    </Container>
  )
}

export default Messages
