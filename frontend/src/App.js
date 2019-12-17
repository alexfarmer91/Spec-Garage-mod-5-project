import React, {Fragment} from 'react';
import './App.css';
import Nav from './components/Nav.js';
import NewCarForm from './components/NewCarForm.js'
import ButtonContainer from "./components/ButtonContainer.js"
import LoginForm from "./components/LoginForm.js"
import SignupForm from "./components/SignupForm.js"
import CarPage from './components/CarPage.js'
import ProfilePage from './components/ProfilePage.js'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'


class App extends React.Component {

  state = {
    token: null,
    menuType: null,
    session: false,
    loggedInUserId: null,
    currentUser: null,
    currentUserCars: []
  }

  setCurrentUser = (user) => {
    this.setState({
      currentUser: user
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
    .then(allCars => {
      console.log(allCars)
      if (localStorage.token && localStorage.user_id){
        this.setToken(localStorage)
      }
    })
  }

  renderMenu = () => {
    switch (this.state.menuType){
      case null:
        return <ButtonContainer signupClick={this.changeToSignup} loginClick={this.changeToLogin} />
      case "signup":
        return <SignupForm setToken={this.setToken} backButtonClick={this.menuBack} setCurrentUser={this.setCurrentUser} />
      case "login":
        return <LoginForm setToken={this.setToken} backButtonClick={this.menuBack} setCurrentUser={this.setCurrentUser} />
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
    return <CarPage {...props} />
  }

  renderProfilePage = () => {
    return (<Fragment>
      {this.state.session ? <ProfilePage setCurrentUser={this.setCurrentUser} cars={this.state.currentUserCars} currentUser={this.state.currentUser} setCars={this.setCars} deleteProfile={this.deleteProfile} userId={this.state.loggedInUserId}/> : <Redirect to='/' /> }
    </Fragment>)
  }

 renderNav = () => {
   return (<div>
   < Nav handleLogout={this.handleLogout} renderMenu={this.renderMenu} isLoggedIn={this.state.session} loggedInUser={this.state.currentUser} />
   {this.renderProfilePage()}
   </div>)
 }

 renderNewCarForm = () =>{
   return <NewCarForm addCar={this.addCar} userId={this.state.loggedInUserId}/>
 }

 addCar = (car) => {
   this.setState({
     currentUserCars: [...this.state.currentUserCars,
       car]
   }, console.log(this.state.currentUserCars))
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
          session: false,
          loggedInUserId: null
        })
      )
      .catch(error => {
        this.setState({
          session: false,
          loggedInUserId: null
        })
      })
  }



  render() {
   console.log(this.state.token)
    return (
      <div className='App'>
        <header className="App-header">
        <span className="headerText">Spec Garage</span><br></br>
			<span className="normalText">Share Your Cars With The Internet</span>
        <aside className="sidebar">
            <ul>
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink exact to="/discover">Discover</NavLink>
              </li>

              {
                this.state.token ? <li><NavLink exact to="/profile">Profile</NavLink></li> : null
              }

              {
                this.state.currentUserCars.map(car => {
                 return <li key={car.id}><NavLink exact to={`/cars/${car.id}`}>{car.year} {car.make} {car.model}</NavLink></li>
                })
              }
              
            </ul>
          </aside>
         </header>
         <Switch>
           <Route path="/discover" render={this.renderClimbs} />
           <Route path="/profile" render={this.renderProfilePage} />
           <Route exact path="/cars/:id" render={this.renderCar} />
           <Route path="/add-car/" render={this.renderNewCarForm} />
           <Route path="/" render={ this.renderNav } />
         </Switch>
      </div>
    )
  }
}

export default App
