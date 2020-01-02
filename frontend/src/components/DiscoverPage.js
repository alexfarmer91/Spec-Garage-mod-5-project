import React from 'react';
import Sorry from './Sorry.js'
import { Container, Grid, Header, Search } from 'semantic-ui-react'

const DiscoverPage = (props) => {
    return (<Container>
        <Container style={{"margin": "1% 1% 1% 1%"}}>
        <Header size='medium'>Discover</Header>
        <Search 
        icon='search'
        style={{"margin": "1% 1% 1% 1%"}}
        onSearchChange={props.handleSearch}
        results={props.results} />
        </Container>
        <Container style={{"marginTop": "1%"}}>
            <Grid style={{"marginTop": "1%"}}>
                {props.results.length !== 0 ? props.renderAllCarsAsCards() : <Sorry />}
            </Grid>
        </Container>

    </Container>)
}

export default DiscoverPage