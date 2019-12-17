import React from 'react';
import { Button } from 'semantic-ui-react'
import EditCarForm from './EditCarForm.js'
// adding comments to page

class CarPage extends React.Component {

  state = {
    car: null,
    photos: [],
    editing: false
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

 render(){
    return (<div>
      {this.state.photos.map(photo => {
        return <img key={photo.id} style={{width: "600px", height: "400px", objectFit: "cover"}} src={photo.url} alt={this.state.car ? this.state.car.make + "-" + photo.id: "image"} />
      }) }
      <br></br>
      <h3>{this.state.car ? this.state.car.year + " " + this.state.car.make + " " + this.state.car.model : null}</h3>
      <h4>{this.state.car ? this.state.car.nickname : null}</h4>
      {this.state.editing ? <EditCarForm carInfo={this.state.car} urlPath={this.props.match.url} updateCar={this.submitEdit} toggleEdit={this.toggleEdit} /> : <Button onClick={this.toggleEdit} content="Edit Details" />}
      </div>
      )
   }
}

export default CarPage;
