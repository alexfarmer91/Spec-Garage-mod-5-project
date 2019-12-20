import React from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import CarCard from './CarCard.js'
import AddCarCard from './AddCarCard.js'
import carPlaceholder from './assets/menu-car-icon.png'

const MyCars = (props) => {
 return(<Container>
        <Header size={'large'} style={{color:'aqua'}} >My Cars:</Header>
        <Grid divided celled padded={true} container={true}>
       {props.cars.map(car => {
           return <CarCard key={car.id} mainImg={car.photos[0] ? car.photos[0].url : carPlaceholder} carInfo={car} />
       })}
       <AddCarCard />
       </Grid>

     </Container>)
}

export default MyCars;