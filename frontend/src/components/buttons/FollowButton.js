import React from 'react'
import { Button } from 'semantic-ui-react'

const FollowButton = (props) => {
    return(<Button onClick={props.follow} content={"Follow"} />)
}

export default FollowButton;