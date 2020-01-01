import React from 'react';
import WelcomePage from './WelcomePage.js'
import DiscoverPage from './DiscoverPage.js'
import { Route, Switch } from 'react-router-dom'

class SwitchBox extends React.Component {

    mainPageSwitcher = () => {
        if (this.props.session){
           return this.props.renderProfilePage()
        } else {
            return <WelcomePage />
        }
    }  

  render(){
    return(
    <Switch>
        <Route path="/discover" render={this.props.renderDiscoverPage} />
        <Route path="/profile" render={this.props.renderProfilePage} />
        <Route exact path="/cars/:id" render={this.props.renderCar} />
        <Route exact path="/users/:id" render={this.props.renderUserPage} />
        <Route path="/add-car/" render={this.props.renderNewCarForm} />
        <Route exact path="/" render={this.mainPageSwitcher} />
      </Switch>)
  }
}

export default SwitchBox;