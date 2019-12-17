import React from 'react'
import { Button, Form, Container } from 'semantic-ui-react'


export default class EditProfileForm extends React.Component {
    state = {
        username: "", 
        password_digest: "", 
        bio: "", 
        avatar: "", 
        email: "", 
        location: ""
    }

    passwordChange = (event) => {
        this.setState({
            password_digest: event.target.value
        })
       }

       locationChange = (event) => {
        this.setState({
            location: event.target.value
        })
       }

    emailChange = (event) => {
        this.setState({
            email: event.target.value
        })
       }

       avatarChange = (event) => {
        this.setState({
            avatar: event.target.value
        })
       }
   
          bioChange = (event) => {
            this.setState({
                bio: event.target.value
            })
           }
    
       usernameChange = (event) => {
        this.setState({
            username: event.target.value
        })
       }

        handleDelete = () => {
            this.props.deleteProfile(this.props.user.id);

            this.setState({
                redirect: true
            });
        }

    componentDidMount(){
        this.setState({
            username: this.props.userInfo.username,
            email: this.props.userInfo.email,
            password_digest: this.props.userInfo.password,
            bio: this.props.userInfo.bio,
            avatar: this.props.userInfo.avatar,
            location: this.props.userInfo.location 
        })
    }

       handleSubmit = (e) => {
           e.preventDefault();
           
           fetch(`http://localhost:3000/users/${this.props.userInfo.id}`,{
            method: "PUT",
            body: JSON.stringify({

            email: this.state.email,
            username: this.state.username,
            password_digest: this.state.password,
            bio: this.state.bio,
            avatar: this.state.avatar,
            location: this.state.location
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': localStorage.token
              }
         })
           .then(r => r.json())
           .then(user => {
            this.props.onEdit(user)
            this.props.back()
           })
       }

    render(){
        return(<Container fluid={false}>
        <Form onSubmit={this.handleSubmit} >
          <Form.Field>
            <input style={{ width: '15%'}} type="text" name="email" placeholder={"Email..."} onChange={this.emailChange} value={this.state.email} />
            </Form.Field> 
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="username" placeholder={"Username..."} onChange={this.usernameChange} value={this.state.username} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="avatar" placeholder={"Avatar url..."} onChange={this.avatarChange} value={this.state.avatar} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="bio" placeholder={"Add bio..."} onChange={this.bioChange} value={this.state.bio} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="location" placeholder={"Add location..."} onChange={this.locationChange} value={this.state.location} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="password" placeholder={'Password...'} />
            </Form.Field>
            <Button style={{ width: '10%'}} type='submit'>Submit</Button>
            <Button style={{ width: '10%'}} onClick={this.props.back}>Back</Button>
      </Form>
      </Container>
        )
    }


}