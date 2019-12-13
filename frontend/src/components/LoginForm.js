import React from 'react'

export default class LoginForm extends React.Component {
    state = {
        email: "",
        password: "",
        errors: []
    }
    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
       }

       passwordChange = (event) => {
        this.setState({
            password: event.target.value
        })
       }
   
       handleSubmit = (event) => {
        event.preventDefault()
        fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
          })
        }).then(res => res.json())
          .then(data => {
            if (data.errors) {
                console.log(data.errors)
              this.setState({
                errors: data.errors
              })
            } else {
                console.log(data)
              this.props.setToken(data)
            }
          })
      }

    render(){
        return(<form onSubmit={this.handleSubmit}>
            <label for="email-field" />
            <input type="text" onChange={this.emailChange} placeholder="email" id="email-field" name="email" value={this.state.email} />
            <label for="password-field" />
            <input type="password" onChange={this.passwordChange} placeholder="password" id="password-field" name="password" value={this.state.password} />
            <button onClick={this.props.backButtonClick} >Back</button>
            <input type="submit" value="Log In"/>
        </form>)
    }
}