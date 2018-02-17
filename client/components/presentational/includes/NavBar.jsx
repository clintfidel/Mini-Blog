import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Login from '../../container/auth/LoginForm'
import SignUp from '../../container/auth/SignupForm'

class NavBar extends Component {
  render () {
    return (
      <div>
          <nav className='my_navbar'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button
                  type='button'
                  className='navbar-toggle collapsed'
                  data-toggle='collapse'
                  data-target='#myNavbar'
                  aria-expanded='false'
                  aria-controls='myNavbar'>
                  <span className='sr-only'>Toggle navigation</span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                  <span className='icon-bar'></span>
                </button>
                <a className='navbar-brand' href='./navbar.html'>Clint's Blog... <i className='fa fa-pencil' aria-hidden='true' style={{fontSize:'40px'}}></i></a>
              </div>
              <div className='collapse navbar-collapse' id='myNavbar'>
                <ul className='nav navbar-nav navbar-right'>
                  <li className=''>
                    <a href='#' data-toggle='modal' data-target='#modalLoginForm'>Login</a>
                    <Login />
                  </li>
                  <li>
                    <a href='#' data-toggle='modal' data-target='#modalSignUpForm'>Register</a>
                    <SignUp/>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
     
    )
  }
}

// NavBar.propTypes = {

// }

export default NavBar
