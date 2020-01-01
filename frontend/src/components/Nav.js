import React, {Fragment} from 'react';
import WelcomeNav from './WelcomeNav.js'

const Nav = (props) => {
	return (
		<Fragment>
			{props.isLoggedIn ? <WelcomeNav logout={props.handleLogout} user={props.loggedInUser} /> : props.renderMenu()}

		</Fragment>
	)
}

export default Nav
