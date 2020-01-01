import React, {Fragment} from 'react';
import carPlaceholder from './components/assets/menu-car-icon.png'
import './App.css';
import Nav from './components/Nav.js';
import NewCarForm from './components/NewCarForm.js'
import ButtonContainer from "./components/ButtonContainer.js"
import LoginForm from "./components/LoginForm.js"
import SignupForm from "./components/SignupForm.js"
import CarPage from './components/CarPage.js'
import ProfilePage from './components/ProfilePage.js'
import UserPage from './components/UserPage.js'
import MenuSidebar from './components/MenuSidebar.js'
import SwitchBox from './components/SwitchBox.js'

import { Redirect } from 'react-router-dom'
import CarCard from './components/CarCard.js';
import DiscoverPage from './components/DiscoverPage';


class App extends React.Component {

  state = {
    token: null,
    menuType: null,
    session: false,
    loggedInUserId: null,
    currentUser: null,
    currentUserCars: [],
    allCars: [],
    filteredCars: [],
    searchTerm: ""
  }

  handleSearch = (event) => {
   this.setState({
     searchTerm: event.target.value,
     filteredCars: this.state.allCars.filter(car => (car.make.toLowerCase() + " " + car.model.toLowerCase()).includes(event.target.value))
   })
  }

  updateCurrentUser = (user) => {
    this.setState({
      currentUser: user
    })
  }

  setCurrentUser = (userId) => {
   fetch(`http://localhost:3000/users/${userId}`)
   .then(r => r.json())
   .then(user => {
    this.setState({
      currentUser: user
    })
   })
  }

  setCars = (cars) => {
    this.setState({
      currentUserCars: cars
    })
  }

  setToken = (obj)  =>{

    const { token, user_id } = obj

    localStorage.token = token
    localStorage.user_id = user_id

    this.setState({
      token: token,
      loggedInUserId: user_id,
      session: true,
      menuType: null
    })
  }


  changeToLogin = () => {
    this.setState({
      menuType: "login"
    })
  }

  changeToSignup = () => {
    this.setState({
      menuType: "signup"
    })
  }

  menuBack = () => {
    this.setState({
      menuType: null
    })
  }

  componentDidMount(){
    fetch('http://localhost:3000/cars')
    .then(r => r.json())
    .then(fetchedCars => {
      console.log(fetchedCars)
      this.setState({
        allCars: fetchedCars,
        filteredCars: fetchedCars
      })
      if (localStorage.token && localStorage.user_id){
        this.setToken(localStorage)
        this.setCurrentUser(localStorage.user_id)
      }
    })
  }

  renderMenu = () => {
    switch (this.state.menuType){
      case null:
        return <ButtonContainer signupClick={this.changeToSignup} loginClick={this.changeToLogin} />
      case "signup":
        return <SignupForm setToken={this.setToken} backButtonClick={this.menuBack} setToken={this.setToken} />
      case "login":
        return <LoginForm setToken={this.setToken} backButtonClick={this.menuBack} />
      default:
        return <ButtonContainer signupClick={this.changeToSignup} loginClick={this.changeToLogin} />
    }
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      token: null,
      session: false,
      loggedInUserId: null
    })
  }

  renderCar = (props) => {
    return <CarPage {...props} currentUserId={this.state.loggedInUserId} deleteCar={this.deleteCar} />
  }

  renderProfilePage = () => {
    return (<Fragment>
      {this.state.session ? <ProfilePage updateCurrentUser={this.updateCurrentUser} setCurrentUser={this.setCurrentUser} cars={this.state.currentUserCars} currentUser={this.state.currentUser} setCars={this.setCars} deleteProfile={this.deleteProfile} userId={this.state.loggedInUserId}/> : <Redirect to='/' /> }
    </Fragment>)
  }

  renderUserPage = (props) => {
   return <UserPage {...props} currentUser={this.state.currentUser} />
  }

 renderNav = () => {
   return (
     <Fragment>
   < Nav handleLogout={this.handleLogout} renderMenu={this.renderMenu} isLoggedIn={this.state.session} loggedInUser={this.state.currentUser} />
   </Fragment>)
 }

 renderNewCarForm = () =>{
   return <NewCarForm addCar={this.addCar} userId={this.state.loggedInUserId}/>
 }

 addCar = (car) => {
   this.setState({
     currentUserCars: [...this.state.currentUserCars,
       car]
   })
 }

 deleteCar = path => {
    fetch(`http://localhost:3000/cars/${path}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: path})
      })
      .then(r => r.json())
      .then(deletedCar => {
        this.setState({
          currentUserCars: this.state.currentUserCars.filter(car => car.id !== deletedCar.id)
        })
      })
 }


  deleteProfile = (user_id) => {
    fetch(`http://localhost:3000/users/${user_id}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: user_id})
      })
      .then(res => res.json())
      .then(deletedUser => 
        this.setState({
          token: null,
          menuType: null,
          session: false,
          loggedInUserId: null,
          currentUser: null,
          currentUserCars: []
        }, console.log(deletedUser))
      )
  }

  renderAllCarsAsCards = () => {
    return this.state.filteredCars.map(car => {
      return <CarCard key={car.id} mainImg={car.photos[0] ? car.photos[0].url : carPlaceholder} carInfo={car} />
    })
  }

  renderDiscoverPage = () => {
    return <DiscoverPage handleSearch={this.handleSearch} renderAllCarsAsCards={this.renderAllCarsAsCards} />
  }
 
  renderSwitchbox = () => {
    return (<SwitchBox renderDiscoverPage={this.renderDiscoverPage} session={this.state.session} renderProfilePage={this.renderProfilePage} renderCar={this.renderCar} renderUserPage={this.renderUserPage} renderNewCarForm={this.renderNewCarForm} />)
  }

  render() {
    return (
      <div className='App'>
            <div className="ui menu">
              <div className="right menu">
                <div className="item">Spec Garage</div>
                <div className="item">{this.renderNav()}</div>
              </div>
            </div>

        <MenuSidebar renderSwitchbox={this.renderSwitchbox} currentUserCars={this.state.currentUserCars} token={this.state.token} />

      </div>
    )
  }
}

export default App
