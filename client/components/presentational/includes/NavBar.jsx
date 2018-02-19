import React, { Component } from 'react'
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types'
import Login from '../../container/auth/LoginForm'
import SignUp from '../../container/auth/SignupForm'

class NavBar extends Component {
	render() {
		return (
			<div>
				<nav className="navbar navbar-expand-lg my_navbar navbar-header">
					<Link to='/' className='navbar-brand'>Clint's Blog...
					<i className='fa fa-pencil'
							aria-hidden='true'
							style={{ fontSize: '40px' }}>
						</i>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>

					<div
						className="collapse navbar-collapse"
						id="navbarSupportedContent">
						<ul
							className="navbar-nav ml-auto">
							<li>
								<a
									data-toggle='modal'
									data-target='#modalLoginForm'>Login
								</a>
								<Login />
							</li>
							<li>
								<a 
									data-toggle='modal' 
									data-target='#modalSignUpForm'>Register
								</a>
								<SignUp />
							</li>
						</ul>
					</div>
				</nav>
			</div>

		)
	}
}

// NavBar.propTypes = {

// }

export default NavBar
