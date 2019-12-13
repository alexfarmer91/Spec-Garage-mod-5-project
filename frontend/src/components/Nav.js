import React from 'react'
import WelcomeNav from './WelcomeNav.js'

const Nav = (props) => {
	return (
		<div className="navWrapper">
			{props.isLoggedIn ? <WelcomeNav logout={props.handleLogout} user={props.loggedInUser} /> : props.renderMenu()}

		</div>
	)
}

export default Nav
