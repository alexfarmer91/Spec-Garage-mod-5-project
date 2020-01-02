import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

const Sorry = (props) => {
    return<Container>
        <Header icon='search' size='large'>Uh oh!</Header>
        <Header size='medium'>Looks like no results match your search</Header>
    </Container>
}

export default Sorry;