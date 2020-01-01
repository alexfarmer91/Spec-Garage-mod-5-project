import React, {Fragment} from 'react';

const ButtonContainer = (props) => {
	return (
		
			<Fragment>
				<button className="item" onClick={props.loginClick} >Log In</button>
				<button className="item" onClick={props.signupClick} >Sign Up</button>
			</Fragment>
	)
}

export default ButtonContainer