import React, {Fragment} from 'react';
import './App.css';
import Nav from './components/Nav.js';
// import LoginSelect from './components/LoginSelect.js'
import ClimbContainer from './components/ClimbContainer.js';
import ButtonContainer from "./components/ButtonContainer.js"
import LoginForm from "./components/LoginForm.js"
import SignupForm from "./components/SignupForm.js"
import ClimbPage from './components/ClimbPage.js'
import ProfilePage from './components/ProfilePage.js'
import { Route, Switch, NavLink, Redirect } from 'react-router-dom'


class App extends React.Component {

  state = {
    token: null,
    menuType: null,
    isDisplaying: false,
    displayClimb: {},
    session: false,
    loggedInUserId: null
  }

  setToken = ({ token, user_id })  =>{

    localStorage.token = token
    localStorage.user_id = user_id

    this.setState({
      token: token,
      loggedInUserId: user_id
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
    })
  }

  renderMenu = () => {
    switch (this.state.menuType){
      case null:
        return <ButtonContainer signupClick={this.changeToSignup} loginClick={this.changeToLogin} />
      case "signup":
        return <SignupForm backButtonClick={this.menuBack} handleLogin={this.handleLogin}  />
      case "login":
        return <LoginForm setToken={this.setToken} backButtonClick={this.menuBack} handleLogin={this.handleLogin}  />
      default:
        return <ButtonContainer signupClick={this.changeToSignup} loginClick={this.changeToLogin} />
    }
  }


  showClimbPage = (event) => {
    console.log(event.target.id)
    this.setState({
      isDisplaying: true,
      displayClimb: this.state.climbs.find(climb => parseInt(climb.id) === parseInt(event.target.id))
    })
  }

  displayAllClimbs= () => {

    this.setState({
      isDisplaying: false
    })
  }

  handleLogin = (user) =>{
    this.setState({
      session: true,
      loggedInUser: user,
      menuType: null
    })
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({
      token: null,
      session: false,
      loggedInUser: null
    })
  }

  renderClimbs = () => {
  if (this.state.isDisplaying) {
    return <ClimbPage info={this.state} climbInfo={this.state.displayClimb} displayAllClimbs={this.displayAllClimbs}/>
  } else { 
    return < ClimbContainer showClimbPage={this.showClimbPage} climbs={this.state.climbs} /> 
  }
  }

  renderProfilePage = () => {
    return (<Fragment>
      {this.state.session ? <ProfilePage deleteProfile={this.deleteProfile} onEdit={this.handleLogin} user={this.state.loggedInUser}/> : <Redirect to='/' /> }
    </Fragment>)
  }

 renderNav = () => {
   return < Nav handleLogout={this.handleLogout} renderMenu={this.renderMenu} isLoggedIn={this.state.session} loggedInUser={this.state.loggedInUser} />
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
          loggedInUser: null
        })
      )
      .catch(error => {
        this.setState({
          session: false,
          loggedInUser: null
        })
      })
  }



  render() {

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
                this.state.session ? <NavLink exact to="/profile">My Profile</NavLink> : null
              }
              
            </ul>
          </aside>
         </header>
         <Switch>
           <Route path="/discover" render={this.renderClimbs} />
           <Route path="/profile" render={this.renderProfilePage} />
           <Route path="/" render={ this.renderNav } />
         </Switch>
      </div>
    )
  }
}

export default App
