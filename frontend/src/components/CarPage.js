import React from 'react';
import { Button, Container, Card, Image, Icon } from 'semantic-ui-react'
import EditCarForm from './EditCarForm.js'
import carPlaceholder from './assets/menu-car-icon.png'
import { Redirect } from 'react-router-dom'

class CarPage extends React.Component {

  state = {
    car: null,
    photos: [],
    editing: false,
    deleted: false
  }

  componentDidMount(){
    fetch(`http://localhost:3000${this.props.match.url}`)
    .then(r => r.json())
    .then(carObj => {
      this.setState({
        car: carObj,
        photos: carObj.photos
      })
    })
  }

  setRedirect = () => {
    this.setState({
      deleted: true
    })
  }

  delete = () => {

    this.props.deleteCar(this.state.car.id)
    // we'll want to refactor this
    setTimeout(
    this.setRedirect, 1000)
  }

  toggleEdit = () => {
    this.setState({
      editing: !this.state.editing
    })
  }

  submitEdit = (carObj) => {
    this.setState({
      car: carObj
    })
  }

  componentDidUpdate(prevProps){

   if(prevProps.match.url !== this.props.match.url){
    fetch(`http://localhost:3000${this.props.match.url}`)
    .then(r => r.json())
    .then(carObj => {
      this.setState({
        car: carObj,
        photos: carObj.photos
      })
    })
   }
  }

  editAndDeleteButton = () => {
    return(<Container>
      <Button onClick={this.toggleEdit} content="Edit Details" />
      <Button onClick={this.delete} content="Delete From Garage" />
    </Container>)

  }

  renderEdit = () => {
    if(parseInt(this.state.car.owner.id) === parseInt(this.props.currentUserId)){
      return (this.state.editing ? <EditCarForm carInfo={this.state.car} urlPath={this.props.match.url} updateCar={this.submitEdit} toggleEdit={this.toggleEdit} /> : this.editAndDeleteButton())
    } else {
      return null
    }
  }

 render(){   
       return (<Container>
         <Card style={{"margin": "0 auto"}}>
        <Image rounded src={this.state.photos[0] ? this.state.photos[0].url : carPlaceholder} fluid={false} />
        <Card.Content>
      <Card.Header>{this.state.car ? this.state.car.year + " " + this.state.car.make + " " + this.state.car.model + " " + this.state.car.trim : null}</Card.Header>
      <Card.Description>
        "{this.state.car ? this.state.car.nickname : null}"
      </Card.Description>
      <Card.Meta>
        {this.state.car ? <a href={`/users/${this.state.car.owner.id}`} className='owner'>Owned by: {this.state.car.owner.username}</a> : null}
      </Card.Meta>
      <Card.Description>
        {this.state.car ? `This car has ${this.state.car.parts.length} ${parseInt(this.state.car.parts.length) === 1 ? "part" : "parts"} installed.` : null}
      </Card.Description>
    </Card.Content>
       </Card>
        {this.state.car ? this.renderEdit() : null}
        {this.state.deleted ? <Redirect to="/profile" /> : null}
       </Container>)
   }
}

export default CarPage;
