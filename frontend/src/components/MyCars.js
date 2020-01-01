import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import CarCard from './CarCard.js'
import AddCarCard from './AddCarCard.js'
import carPlaceholder from './assets/menu-car-icon.png'

const MyCars = (props) => {
 return(
   
   <Container>
<div className="ui floating message">
  <p>My Cars!</p>
</div>
      <div className="ui container" style={{paddingLeft:"140px"}}>
            <div className="ui grid" >
          {props.cars.map(car => {
              return <CarCard key={car.id} mainImg={car.photos[0] ? car.photos[0].url : carPlaceholder} carInfo={car} />
          })}
          <AddCarCard />
          </div>
       </div>

     </Container>)
}

export default MyCars;