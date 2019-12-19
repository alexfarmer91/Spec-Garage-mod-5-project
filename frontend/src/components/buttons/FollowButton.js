import React from 'react'
import { Button } from 'semantic-ui-react'
import UnfollowButton from './UnfollowButton';

const FollowButton = (props) => {
    return(<Button onClick={props.follow} content={"Follow"} />)
}

export default FollowButton;