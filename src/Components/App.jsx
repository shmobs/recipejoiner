import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute.jsx';
import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Recipe from './Recipe.jsx';
import UpdateRecipe from './Recipes/UpdateRecipe.jsx';
import CreateRecipe from './Recipes/CreateRecipe.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    const activeUser = sessionStorage.getItem('activeUser');
    this.state = {
      isLoggedIn: !!activeUser,
      activeUser: activeUser || '',
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn(e, userID, callback) {
    e.preventDefault();
    sessionStorage.setItem('activeUser', userID);
    return this.setState({
      isLoggedIn: true,
      activeUser: userID,
    }, callback);
  }

  render() {
    const { isLoggedIn, activeUser } = this.state;
    return (
      <Router>
        <NavBar />
        <Route
          name='home'
          exact
          path='/'
          render={props => (
            <Home
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              logIn={this.logIn}
              {...props}
            />
          )}
        />
        <PrivateRoute
          name='dashboard'
          exact
          path='/dashboard'
          authenticated={isLoggedIn}
          component={props => (
            <Dashboard
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              {...props}
            />
          )}
        />
        <Route
          name='recipe'
          exact
          path='/recipe/:id'
          render={props => (
            <Recipe
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              {...props}
            />
          )}
        />
        <PrivateRoute
          name='edit'
          exact
          path='/recipe/:id/edit'
          authenticated={isLoggedIn}
          component={props => (
            <UpdateRecipe
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              {...props}
            />
          )}
        />
        <PrivateRoute
          name='create'
          exact
          path='/create'
          authenticated={isLoggedIn}
          component={props => (
            <CreateRecipe
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              {...props}
            />
          )}
        />
      </Router>
    );
  }
}

export default App;
