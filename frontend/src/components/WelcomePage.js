import React from 'react'
import { Header, Container } from 'semantic-ui-react'

const WelcomePage = (props) => {

    return (
      <Container fluid >
      <Header size='large' >
       Welcome to Spec Garage
      </Header>
       <Header size='medium'>
           A place for automotive content creators to document their builds and share media all in once place.
       </Header>
       <Header size='small'>
           Log in or sign up above to get started.
       </Header>
      </Container>)

}

export default WelcomePage;