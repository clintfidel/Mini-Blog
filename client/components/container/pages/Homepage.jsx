import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Articles from '../../presentational/pages/Articles'
import NavBar from '../../presentational/includes/NavBar'
import Footer from '../../presentational/includes/Footer'

const HomePage = (props) => (
  <div>
    <div className='all-page'>
      <NavBar />
      <Articles />
      <Footer />
    </div>
  </div>
)
// HomePage.propTypes = {

// }

export default HomePage
