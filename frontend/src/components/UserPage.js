import React, {Fragment} from 'react';
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

    render(){
        console.log(this.props.match.url)
        return(<Fragment>
            {this.state.followed ? <UnfollowButton unfollow={this.unfollow} /> : <FollowButton follow={this.follow} />}
        </Fragment>)
    }
}