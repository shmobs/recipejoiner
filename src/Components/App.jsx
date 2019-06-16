import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import NavBar from './NavBar.jsx';
import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';
import Recipe from './Recipe.jsx';
import CreateRecipe from './Recipes/CreateRecipe.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      activeUser: '',
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn(e, userID, callback) {
    e.preventDefault();
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
        <Route
          name='dashboard'
          exact
          path='/dashboard'
          render={props => (
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
          path='/recipes/:id'
          render={props => (
            <Recipe
              isLoggedIn={isLoggedIn}
              activeUser={activeUser}
              {...props}
            />
          )}
        />
        <Route
          name='create'
          exact
          path='/create'
          render={props => (
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
