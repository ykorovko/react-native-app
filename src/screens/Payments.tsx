import React from 'react'

import ScrollableView from '../components/ScrollableView'
import { Container, Grid, Title } from '../styled'

const Payments: React.FC = () => {
  return (
    <Container>
      <ScrollableView>
        <Grid spacing={1}>
          <Title>Payments</Title>
        </Grid>
      </ScrollableView>
    </Container>
  )
}

export default Payments
