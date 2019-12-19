import React from 'react'
import MyCars from './MyCars.js'
import EditProfileForm from './EditProfileForm.js'

class ProfilePage extends React.Component {

    state = {
      edit: false
    }

  componentDidMount(){
      fetch(`http://localhost:3000/users/${this.props.userId}`)
      .then(r => r.json())
      .then(user => {
          this.props.setCurrentUser(user.id)
          fetch('http://localhost:3000/cars/')
          .then(r => r.json())
          .then(cars => {
          let filteredCars = cars.filter(car => parseInt(car.owner.id) === parseInt(this.props.userId))
          this.props.setCars(filteredCars)
      })
      })
  }

  onEdit = (patch) => {
    this.props.updateCurrentUser(patch)
  }

  toggleEdit = () => {
      this.setState({
          edit: true
      })
  }

  leaveEdit = () => {
    this.setState({
        edit: false
    })
}

   render () {
    return(<div>
        <div id="edit-profile-container">
         {this.state.edit ? <EditProfileForm back={this.leaveEdit} deleteProfile={this.props.deleteProfile} onEdit={this.onEdit} userInfo={this.props.currentUser} toggleEdit={this.toggleEdit} /> : <button className="ui button" onClick={this.toggleEdit}>Edit Profile</button>}
        </div>
        <div id="my-cars">
         <MyCars cars={this.props.cars} />
        </div>

    </div>)
   }
}

export default ProfilePage;