import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import User from '../components/presentational/includes/NavBar';
import HomePage from '../components/container/pages/Homepage'


const Routes = () => (
  <Router>
    <Switch>
      <Route path='/' component={HomePage} />
      <Route path='/user' component={User} />
      
    </Switch>
  </Router>
)

export default Routes
