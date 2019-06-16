import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './NavBar';
import Home from './Home';
import Dashboard from './Dashboard';
import Recipe from './Recipe';
import CreateRecipe from './Recipes/CreateRecipe';


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
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

export default App;
