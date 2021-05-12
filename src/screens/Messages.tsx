import React from 'react'

import ScrollableView from '../components/ScrollableView'
import { Container, Spacer, Title } from '../styled'

const Messages: React.FC = () => {
  return (
    <Container>
      <ScrollableView>
        <Spacer spacing={1}>
          <Title>Messages</Title>
        </Spacer>
      </ScrollableView>
    </Container>
  )
}

export default Messages
