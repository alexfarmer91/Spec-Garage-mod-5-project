import React, {Fragment} from 'react';
import { Card, Icon, Image, Loader, Divider, Grid, Segment } from 'semantic-ui-react' 
import { Redirect } from 'react-router-dom'
import FollowButton from './buttons/FollowButton.js'
import UnfollowButton from './buttons/UnfollowButton.js'

export default class UserPage extends React.Component{
    state = {
        user: null,
        followers: [],
        followed: false,
        userCars: []
    }

    componentDidMount(){
        fetch(`http://localhost:3000${this.props.match.url}`)
        .then(r => r.json())
        .then(userObj => {
            let arrayOfUserIds = userObj.my_followers.map( follower => parseInt(follower.user_id) )
            this.setState({
                user: userObj,
                followers: userObj.my_followers,
                followed: arrayOfUserIds.includes(parseInt(localStorage.user_id)),
                userCars: userObj.cars
            })
        })
    }

    unfollow = () => {
      let followInstance = this.state.followers.find( follower => follower.user_id === parseInt(localStorage.user_id))
      let path = followInstance.follow_id

        fetch(`http://localhost:3000/follows/${path}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({id: path})
          })
          .then(r => r.json())
          .then(follow => {
              console.log(follow)
              this.setState({
                  followed: false,
                  followers: this.state.followers.filter(follower => parseInt(follower.user_id) !== parseInt(localStorage.user_id))
              })
          })
     }
  
    follow = () => {
      fetch('http://localhost:3000/follows',{
        method: "POST",
        body: JSON.stringify({
         follower_id: parseInt(localStorage.user_id),
         followed_user_id: this.state.user.id,
        }),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
     })
       .then(r => r.json())
       .then(follow => {
           console.log(follow)
           if (!follow.error)
           this.setState({
               followed: true,
               followers: [
                   ...this.state.followers,
                   {avatar: this.props.currentUser.avatar,
                    follow_id: follow.id,
                    user_id: this.props.currentUser.id,
                    username: this.props.currentUser.username}
               ]
           })
       })
   }

   componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url){
     fetch(`http://localhost:3000${this.props.match.url}`)
     .then(r => r.json())
     .then(userObj => {
      let arrayOfUserIds = userObj.my_followers.map( follower => parseInt(follower.user_id) )
       this.setState({
        user: userObj,
        followers: userObj.my_followers,
        followed: arrayOfUserIds.includes(parseInt(localStorage.user_id)),
        userCars: userObj.cars
       })
     })
    }
   }

   buttonSwitcher = () => {
       return (<Fragment>
        {this.state.followed ? <UnfollowButton unfollow={this.unfollow} /> : <FollowButton follow={this.follow} />}
    </Fragment>)
   }

   followSection = () =>{
       return (<Segment>
        <Grid columns={2} relaxed='very'>
          <Grid.Column>
          <Fragment>
            <Icon name='user' />
            {this.state.user.my_followers.length} {parseInt(this.state.user.my_followers.length) === 1 ? "follower" : "followers"}
          </Fragment>
          </Grid.Column>
          <Grid.Column>
           {this.buttonSwitcher()}
          </Grid.Column>
        </Grid>
    
        <Divider vertical>
            </Divider>
      </Segment>)
   }

   redirectIfSameUser = () => {
       try { 
       if (parseInt(this.props.match.params.id) === parseInt(localStorage.user_id)) {
           return <Redirect to ="/profile" />
       }
    } catch {
        console.log('current user not yet mounted')
    }
   }
   

    render(){
        console.log(this.props.match.params.id)
        if (this.props.currentUser){
        console.log(`hello ${this.props.currentUser.id}`)
        }

            if (this.state.user) {
                return (<Card centered>
                    <Image src={this.state.user.avatar} />
                    <Card.Content>
                       <Card.Header>{this.state.user.username}</Card.Header>
                       <Card.Meta>
                         <span className='bio'>{this.state.user.location}</span>
                       </Card.Meta>
                       <Card.Description>
                         {this.state.user.bio}
                       </Card.Description>
                     </Card.Content>
                     <Card.Content extra>
                       {this.followSection()}
                    </Card.Content>
                    {this.redirectIfSameUser()}
                 </Card>)
            } else {
                return <Loader />
            }
    }
}