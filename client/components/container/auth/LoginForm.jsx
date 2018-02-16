import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import toastrOption from '../../../utils/toastrOption'
import { loginAction } from '../../../actions/AuthAction'

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
    this.setState({
      [name]: value
    })
  }
  onSubmit (event) {
    event.preventDefault()
    this.setState({
      isLoading: true
    })
    this.props.loginAction(this.state)
      .then((message) => {
        toastrOption()
        toastr.success(message)
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
          id='modalLoginForm'
          tabIndex='-1'
          role='dialog'
          aria-labelledby='myModalLabel'
          aria-hidden='false'>
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header text-center'>
                <h4 className='modal-title w-100 font-bold'>Sign in</h4>
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
                    <i className='fa fa-envelope prefix grey-text'></i>
                    <label
                      className='login'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-username'>
                      username
                    </label>
                    <input
                      onChange={this.onChange}
                      name='username'
                      type='text'
                      id='defaultForm-email'
                      className='form-control validate'
                      required/>
                  </div>
                  <div className='md-form'>
                    <i className='fa fa-lock prefix grey-text'></i>
                    <label
                      className='login'
                      data-error='wrong'
                      data-success='right'
                      htmlFor='defaultForm-pass'>
                      Your password
                    </label>
                    <input
                      onChange={this.onChange}
                      name='password'
                      type='password'
                      id='defaultForm-pass'
                      className='form-control validate'
                      required/>
                  </div>
                  <div className='modal-footer d-flex justify-content-center'>
                    <button className='btn btn-default' id='login-button'>
                      Login
                    </button>
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

LoginForm.propTypes = {
  loginAction: PropTypes.func.isRequired
}

export default connect(null, {loginAction})(LoginForm)
