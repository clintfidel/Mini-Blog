import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignupAndSignin from '../components/presentational/includes/NavBar';
// import AllBlog from '../components/container/ArticlesPage';


const Routes = () => (
  <Router>
    <Switch>
      <Route path='/createUser' component={SignupAndSignin} />
      
    </Switch>
  </Router>
)

export default Routes
