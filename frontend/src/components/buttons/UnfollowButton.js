import React from 'react'
import { Button } from 'semantic-ui-react'

const UnfollowButton = (props) => {
    return(<Button size='mini' onClick={props.unfollow} content={"Unfollow"} />)
}

export default UnfollowButton;