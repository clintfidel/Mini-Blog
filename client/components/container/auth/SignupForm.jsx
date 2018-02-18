import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerAction } from '../../../actions/AuthAction';
import toastrOption from '../../../utils/toastrOption';
import checkUserInput from '../../../utils/validation';

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
          return false
        }
        return true
        break
      case 'email':
        if (!(value.endsWith('.com') && /@/.test(value))) {
          this.setState({ emailError: 'Invalid email'})
          return false
        }
        return true
        break
      case 'password':
        if (value.length < 5 || !value) {
          this.setState({passwordError: 'Your password is required'})
          return false
        }
        return true
        break
      case 'confirmPassword':
        if (value !== this.state.password) {
          this.setState({confirmPasswordError: 'password do not match!'})
          return false
        }
        return true
        break
    }
  }

  onSubmit (event) {
    event.preventDefault()
    // const username = this.state.username
    // const fullname = this.state.fullname
    // const password = this.state.password
    const { username, fullname, password } = this.state
    if (checkUserInput(username, fullname, password)) {
      toastrOption()
      return toastr.error('Invalid Input')
    }
    this.setState({
      isLoading: true
    })
    this.props.registerAction(this.state)
      .then((message) => {
        toastrOption()
        toastr.success('You have signed up successfully')
      // setTimeout(() => {
      //   this.setState({ redirectUser: true })
      // }, 3000)
      })
      .catch(message => {
        toastrOption()
        toastr.error(message)
      })
  }

  render () {
    return (
      <div>
        <div
          className='modal fade'
          id='modalSignUpForm'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='myModalLabel'
          aria-hidden='false'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header text-center'>
                <h4 className='modal-title w-100 font-bold'>Register</h4>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'>
                  <span aria-hidden='false'>×</span>
                </button>
              </div>
              <div className='modal-body mx-3'>
                <form
                  onSubmit={this.onSubmit}
                  id='login-form'
                  action='#'
                  method='post'
                  role='form'
                  style={{display: 'block'}}>
                  <div className='md-form'>
                    <i className='fa fa-user prefix grey-text'></i>
                    <label
                      className='register'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-fullname'>
                      Fullname
                    </label>
                    <input
                      onChange={this.onChange}
                     
                      type='text'
                      id='defaultForm-fullname'
                      name='fullname'
                      className='form-control validate'
                      required/>
                  </div>
                  <div className='md-form'>
                    <i className='fa fa-user prefix grey-text'></i>
                    <label
                      className='register'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-username'>
                      Username
                    </label>
                    <input
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      type='text'
                      id='defaultForm-username'
                      className='form-control validate'
                      name='username'
                      required/>
                    <div style={{color: 'red'}}>
                      {this.state.usernameError}
                    </div>
                  </div>
                  <div className='md-form'>
                    <i className='fa fa-envelope prefix grey-text'></i>
                    <label
                      className='register'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-email'>
                      Email
                    </label>
                    <input
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      type='email'
                      id='defaultForm-email'
                      className='form-control validate'
                      name='email'
                      required/>
                    <div style={{color: 'red'}}>
                      {this.state.emailError}
                    </div>
                  </div>
                  <div className='md-form'>
                    <i className='fa fa-lock prefix grey-text'></i>
                    <label
                      className='register'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-pass'>
                      Password
                    </label>
                    <input
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      type='password'
                      id='pword'
                      className='form-control validate'
                      name='password'
                      required/>
                    <div style={{color: 'red'}}>
                      {this.state.passwordError}
                    </div>
                  </div>
                  <div className='md-form'>
                    <i className='fa fa-lock prefix grey-text'></i>
                    <label
                      className='register'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-pass'>
                      confirm-password
                    </label>
                    <input
                      onChange={this.onChange}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      type='password'
                      id='defaultForm-pass'
                      className='form-control validate'
                      name='confirmPassword'
                      required/>
                    <div style={{color: 'red'}}>
                      {this.state.confirmPasswordError}
                    </div>
                  </div>
                  <div className='modal-footer d-flex justify-content-center'>
                    <input
                      type='submit'
                      name='register-submit'
                      id='register-button'
                      tabIndex='-4'
                      className='btn btn-default'
                      value='Register Now' />
                    <div className='text-center'>
                      <a href=' ' tabIndex='-5' className='SignIn'>Already have an account? SignIn</a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignupForm.propTypes = {
  registerAction: PropTypes.func.isRequired
}

export default connect(null, {registerAction})(SignupForm)
