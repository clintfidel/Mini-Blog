import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../presentational/auth/LoginForm'
import SignupForm from '../presentational/auth/SignupForm'

class HomePage extends Component {
  render () {
    return (
      <div>
      <img src="../images/blog (1).jpg" alt="my logo"/>
      <div className="container">
          <h1>Welcome to Clint's Blog...<i className="fa fa-pencil" aria-hidden="true" style={{fontSize:"40"}}></i></h1>
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <div className="panel panel-login">
              <div className="panel-heading">
                <div className="row">
                  <div className="col-xs-6">
                    <a href="#" className="active" id="login-form-link">Login</a>
                  </div>
                  <div className="col-xs-6">
                    <a href="#" id="register-form-link">Register</a>
                  </div>
                </div>
                <hr/>
              </div>
              <div className="panel-body">
                <div className="row">
                  <div className="col-lg-12">
                  <LoginForm/>
                   <SignupForm/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
    )
  }
}

// HomePage.propTypes = {

// }

export default HomePage
