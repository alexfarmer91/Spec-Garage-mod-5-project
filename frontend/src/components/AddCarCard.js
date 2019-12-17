import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const CarCard = (props) => {

    return (<Card>
    <Image className="card-img-small" src="https://allentownparking.com/wp-content/uploads/2018/03/menu-car-icon.png" href="/cars/new" fluid={false} />
    <Card.Content>
      <Card.Header>Add Car to Garage</Card.Header>
      <Card.Description>
        Click to upload images, details, and more
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a href="/add-car">
        <Icon name='add' />
        add to garage
      </a>
    </Card.Content>
  </Card>
    )
  
}

export default CarCard;