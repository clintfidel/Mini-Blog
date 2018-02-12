import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toastrOption from '../../../utils/toastrOption';
import { checkUserInput } from '../../../utils/validation'

class SignupForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fullname: '',
      username: '',
      email: '',
      password: '',
      isLoading: false,
      confirmPassword: '',
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmPasswordError: '',
      redirectUser: false
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (event) {
    const name = event.target.name
    const value = event.target.value
    this.setState({
      [name]: value
    })
  }

  onFocus (event) {
    const name = event.target.name
    switch (name) {
      case 'username':
        this.setState({usernameError: ''})
        break
      case 'email':
        this.setState({emailError: ''})
        break
      case 'password':
        this.setState({passwordError: ''})
        break
      case 'confirmPassword':
        this.setState({confirmPasswordError: ''})
        break
    }
  }
  onBlur (event) {
    const name = event.target.name,
     value = event.target.value,
      pwordVal = document.getElementById('pword').value
    switch (name) {
      case 'username':
        if (value.length < 5 || !value) {
          this.setState({usernameError: 'Username should be more than 5 characters'})
          return false;
        }
        return true
        break
      case 'email':
      if(!(value.endsWith('.com') && /@/.test(value))) {
        this.setState({ emailError: 'Invalid email'})
        return false;
      }
      return true;
        break
      case 'password':
        if (value.length < 5 || !value) {
          this.setState({passwordError: 'Your password is required'})
          return false;
        }
        return true
        break
      case 'confirmPassword':
        if (value !== this.state.password) {
          this.setState({confirmPasswordError: 'password do not match!'})
          return false;
        }
        return true;
        break
    }
  }

  onSubmit(event) {
    event.preventDefault();
    // const username = this.state.username
    // const fullname = this.state.fullname;
    // const password = this.state.password
     const { username, email, password } = this.state;
    console.log(typeof username)
    if(checkUserInput(username, fullname, password)) {
      toastrOption();
       return toastr.error('Invalid Input');
    }
    this.setState({
      isLoading: true
    });
    this.props.registerAction(this.state)
    .then((message) => {
      toastrOption();
      toastr.success('You have successfully signed up');
      // setTimeout(() => {
      //   this.setState({ redirectUser: true });
      // }, 3000);
    })
    .catch(message => {
      toastrOption();
      toastr.error(message);
    });
  }

  render () {
    return (
      <div>
        <form
        onSubmit = {this.onSubmit}
          id='register-form'
          action='#'
          role='form'
          style={{display: 'none'}}>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='text'
              name='fullname'
              id='fullname'
              tabIndex='-1'
              className='form-control'
              placeholder='Fullname' 
              required/>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='text'
              name='username'
              id='username'
              tabIndex='-1'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Username' 
              required/>
              <div style = {{color: 'red'}}>{this.state.usernameError}</div>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='email'
              name='email'
              id='email'
              tabIndex='-2'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Email Address' 
              required/>
              <div style = {{color: 'red'}}>{this.state.emailError}</div>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              name='password'
              id='pword'
              tabIndex='-3'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Password' 
              required/>
              <div style = {{color: 'red'}}>{this.state.passwordError}</div>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              name='confirmPassword'
              id='confirmPassword'
              tabIndex='-3'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Confirm Password' 
              required/>
              <div style = {{color: 'red'}}>{this.state.confirmPasswordError}</div>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-sm-6 col-sm-offset-3'>
                <input
                  type='submit'
                  name='register-submit'
                  id='register-submit'
                  tabIndex='-4'
                  className='form-control btn btn-register'
                  value='Register Now' />
                <div className='text-center'>
                  <a href=' ' tabIndex='-5' className='SignIn'>Already have an account? SignIn</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

SignupForm.propTypes = {
  registerAction: PropTypes.func.isRequired
}

export default SignupForm
