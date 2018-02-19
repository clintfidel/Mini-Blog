import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Footer extends Component {
  render () {
    return (
      <div>
        <div className='copyright'>
          <div className='container'>
            <div className='row text-center'>
              <p>
                Copyright © 2018 | <strong>All rights reserved</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Footer.propTypes = {

}

export default Footer
