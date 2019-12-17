import React from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Container } from 'semantic-ui-react'

export default class NewCarForm extends React.Component {

    state = {
        year: "",
        make: "",
        model: "",
        nickname: "",
        details: "",
        imgUrl: "",
        redirect: false,
        carId: ""
    }

    renderRedirect = (carId) => {
        return <Redirect to={`/cars/${this.state.carId}`} />

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
       imgUrlChange = (event) => {
        this.setState({
            imgUrl: event.target.value
        })
       }

       handleSubmit = (e) => {
           e.preventDefault();
           
           fetch('http://localhost:3000/cars',{
            method: "POST",
            body: JSON.stringify({

             year: parseInt(this.state.year),
             user_id: this.props.userId,
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
            fetch('http://localhost:3000/photos',{
                method: "POST",
                body: JSON.stringify({
                 url: this.state.imgUrl,
                 car_id: car.id
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  }
             })
             .then(r => r.json())
             .then(photo => {
                 console.log(photo)
                this.props.addCar(car)
                this.setState({
                    carId: car.id,
                    redirect: true
                })
             })
           })
       }

    render(){
        return(<Container fluid={false}>
        <Form onSubmit={this.handleSubmit} >
            <Form.Field>
            <input style={{ width: '10%'}} type="text" name="year" placeholder="year" onChange={this.yearChange} value={this.state.year} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '10%'}} type="text" name="make" placeholder="make" onChange={this.makeChange} value={this.state.make} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '10%'}} type="text" name="model" placeholder="model" onChange={this.modelChange} value={this.state.model} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '10%'}} type="text" name="details" placeholder="details" onChange={this.detailsChange} value={this.state.details} />
            </Form.Field>
            <Form.Field>
            <input style={{ width: '10%'}} type="text" name="imgUrl" placeholder="image url" onChange={this.imgUrlChange} value={this.state.imgUrl} />
            </Form.Field>
            <Button style={{ width: '10%'}} type='submit'>Submit</Button>
      </Form>
      {this.state.redirect ? this.renderRedirect() : false}
      </Container>
        )
    }

}