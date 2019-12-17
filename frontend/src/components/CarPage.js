import React from 'react';
import { Button, Container } from 'semantic-ui-react'
import EditCarForm from './EditCarForm.js'
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
    return (<div>
      {this.state.photos.map(photo => {
        return <img key={photo.id} style={{width: "600px", height: "400px", objectFit: "cover"}} src={photo.url} alt={this.state.car ? this.state.car.make + "-" + photo.id: "image"} />
      }) }
      <br></br>
      <h3>{this.state.car ? this.state.car.year + " " + this.state.car.make + " " + this.state.car.model : null}</h3>
      <h4>{this.state.car ? this.state.car.nickname : null}</h4>
      {this.state.car ? this.renderEdit() : null}
      {this.state.deleted ? <Redirect to="/profile" /> : null}
      </div>
      )
   }
}

export default CarPage;
