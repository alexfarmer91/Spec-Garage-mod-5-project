import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Container } from 'semantic-ui-react'

export default class NewCarForm extends React.Component {

    state = {
        year: "",
        make: "",
        model: "",
        nickname: "",
        details: ""
    }

    componentDidMount(){
        this.setState({
            year: this.props.carInfo.year,
            make: this.props.carInfo.make,
            model: this.props.carInfo.model,
            nickname: this.props.carInfo.nickname,
            details: this.props.carInfo.details 
        })
    }

    yearChange = (event) => {
        this.setState({
            year: event.target.value
        })
       }

       makeChange = (event) => {
        this.setState({
            make: event.target.value
        })
       }
       modelChange = (event) => {
        this.setState({
            model: event.target.value
        })
       }
       nicknameChange = (event) => {
        this.setState({
            nickname: event.target.value
        })
       }
       detailsChange = (event) => {
        this.setState({
            details: event.target.value
        })
       }

       handleSubmit = (e) => {
           e.preventDefault();
           
           fetch(`http://localhost:3000/${this.props.urlPath}`,{
            method: "PUT",
            body: JSON.stringify({

             year: parseInt(this.state.year),
             make: this.state.make,
            model: this.state.model,
            nickname: this.state.nickname,
            details: this.state.details
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
         })
           .then(r => r.json())
           .then(car => {
            this.props.updateCar(car)
            this.props.toggleEdit()
           })
       }

    render(){
        return(<Container fluid={false}>
        <Form onSubmit={this.handleSubmit} >
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="year" placeholder={this.props.carInfo.year} onChange={this.yearChange} value={this.state.year} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="make" placeholder={this.props.carInfo.make} onChange={this.makeChange} value={this.state.make} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="model" placeholder={this.props.carInfo.model} onChange={this.modelChange} value={this.state.model} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="details" placeholder={this.props.carInfo.details === "" || null ? "Add details..." : this.props.carInfo.details} onChange={this.detailsChange} value={this.state.details} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '15%'}} type="text" name="nickname" placeholder={this.props.carInfo.nickname === "" || null ? "Add nickname..." : this.props.carInfo.nickname} onChange={this.nicknameChange} value={this.state.nickname} />
            </Form.Field>
            <Button style={{ width: '10%'}} type='submit'>Submit</Button>
            <Button style={{ width: '10%'}} onClick={this.props.toggleEdit}>Back</Button>
      </Form>
      </Container>
        )
    }

}