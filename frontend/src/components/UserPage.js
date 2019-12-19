import React, {Fragment} from 'react';
import FollowButton from './buttons/FollowButton.js'
import UnfollowButton from './buttons/UnfollowButton.js'

export default class UserPage extends React.Component{
    render(){
        return(<Fragment>
            <FollowButton />
            <UnfollowButton />
        </Fragment>)
    }
}