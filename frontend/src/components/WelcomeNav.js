import React from 'react'

const WelcomeNav = (props) => {
    return(<React.Fragment>
    <h4>{props.user ? `Welcome, ${props.user.username}` : null}</h4>
    <button className="ui button" onClick={props.logout}>Logout</button>
    </React.Fragment>
    )

}

export default WelcomeNav;