import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
      confirmPasswordError: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onChange (event) {
    const name = event.target.name
    const value = event.target.value
    console.log('onChange:' + value)
    this.setState({
      [name]: value
    })
  }

  onFocus (event) {
    const name = event.target.name
    switch (name) {
      case 'username':
        this.setState({username: ''})
        break
      case 'email':
        this.setState({emailError: ''})
        break
      case 'password':
        this.setState({passwordError: ''})
        break
      case 'confirmPassword':
        this.setState({passwordConfirm: ''})
        break
    }
  }
  onBlur (event) {
    const name = event.target.name
    const value = event.target.value
    let password = document.getElementById('password').value
    switch (name) {
      case 'username':
        if (value.length < 5 || value.length === '') {
          this.setState({username: 'Username should be more than 5 characters'})
        }
        break
      case 'email':
      if(!(value.endsWith('.com') && /@/.test(value))) {
        this.setState({ emailError: 'invalid email'})
      }
        break
      case 'password':
        if (value.length < 5 || value.length === '') {
          this.setState({username: 'Username should be more than 5 characters'})
        }
        break
      case 'confirmPassword':
        if (value !== this.state.password) {
          this.setState({username: 'Username should be more than 5 characters'})
        }
        break
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({
      isLoading: true
    })
  }

  render () {
    return (
      <div>
        <form
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
              placeholder='Fullname' />
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
              placeholder='Username' />
              <div style = {{color: 'red'}}>{this.state.passwordConfirm}</div>
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
              placeholder='Email Address' />
              <div style = {{color: 'red'}}>{this.state.passwordConfirm}</div>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              name='password'
              id='password'
              tabIndex='-3'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Password' />
              <div style = {{color: 'red'}}>{this.state.passwordConfirm}</div>
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              name='confirPassword'
              id='confirPassword'
              tabIndex='-3'
              className='form-control'
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              placeholder='Confirm Password' />
              <div style = {{color: 'red'}}>{this.state.passwordConfirm}</div>
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

// SignupForm.propTypes = {

// }

export default SignupForm
