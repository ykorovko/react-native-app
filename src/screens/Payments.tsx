import React from 'react'

import ScrollableView from '../components/ScrollableView'
import { Container, Spacer, Title } from '../styled'

const Payments: React.FC = () => {
  return (
    <Container>
      <ScrollableView>
        <Spacer spacing={1}>
          <Title>Payments</Title>
        </Spacer>
      </ScrollableView>
    </Container>
  )
}

export default Payments
