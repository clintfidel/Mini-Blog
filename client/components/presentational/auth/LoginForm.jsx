import React, { Component } from 'react'
import PropTypes from 'prop-types'
import toastrOption from '../../../utils/toastrOption'

class LoginForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
			password: '',
			isLoading: false
    }
		this.onChange = this.onChange.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
  }

  onChange (event) {
    const name = event.target.name
		const value = event.target.value
		console.log('onchange:' + value)
    this.setState({
      [name]: value
    })
	}
	onSubmit(event) {
		event.preventDefault();
		this.setState({
			isLoading: true
		})
    this.props.loginAction(this.state)
    .then((message) => {
      toastrOption();
      toastr.success('You have successfully logged in');
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
				onSubmit={this.onSubmit}
          id='login-form'
          action='#'
          method='post'
          role='form'
          style={{display: 'block'}}>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='text'
              name='username'
              id='username'
              tabIndex='-1'
              className='form-control'
              placeholder='Username' />
          </div>
          <div className='form-group'>
            <input
              onChange={this.onChange}
              type='password'
              name='password'
              id='password'
              tabIndex='-2'
              className='form-control'
              placeholder='Password' />
          </div>
          <div className='form-group text-center'>
            <input
              type='checkbox'
              tabIndex='-3'
              className=''
              name='remember'
              id='remember' />
            <label htmlFor='remember'>
              Remember Me
            </label>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-sm-6 col-sm-offset-3'>
                <input
                  type='submit'
                  name='login-submit'
                  id='login-submit'
                  tabIndex='-4'
                  className='form-control btn btn-login'
                  value='Log In' />
              </div>
            </div>
          </div>
          <div className='form-group'>
            <div className='row'>
              <div className='col-lg-12'>
                <div className='text-center'>
                  <a href='#' tabIndex='-5' className='forgot-password'>Forgot Password?</a>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
	loginAction: PropTypes.func.isRequired
}

export default LoginForm
