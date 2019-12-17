import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

const CarCard = (props) => {

    return (<Card>
    <Image className="card-img-small" src={props.mainImg} href={`/cars/${props.carInfo.id}`} fluid={false} />
    <Card.Content>
      <Card.Header>{props.carInfo.year} {props.carInfo.make} {props.carInfo.model}</Card.Header>
      <Card.Meta>
        <span className='owner'>Owned by: {props.carInfo.owner.username}</span>
      </Card.Meta>
      <Card.Description>
        This car has {props.carInfo.parts.length} {parseInt(props.carInfo.parts.length) === 1 ? "part" : "parts"} installed.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='like' />
        {props.carInfo.likes.length}
      </a>
    </Card.Content>
  </Card>
    )
  
}

export default CarCard;




// <img alt={''} onClick={this.showDetails} src={this.props.climbImages.imgSmallMed}/>
//   <br></br>
// {this.state.details ?
//   <div>
//     <h2>{this.props.climbImages.name}</h2>
//     <h2>{this.props.climbImages.rating}</h2>
//     {
//   // <h2>{this.props.climbImages.stars}</h2>
//   //   <h2>{this.props.climbImages.location[1] + ", " + this.props.climbImages.location[0]}</h2>
//     }
//   </div>
//    : null}
