import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { browserHistory } from 'react-router';
import Home from './Home';
import Dashboard from './Dashboard';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      activeUser: '',
    };

    this.logIn = this.logIn.bind(this);
  }

  logIn(e, userID) {
    e.preventDefault();
    console.log(e, userID);
    this.setState({
      isLoggedIn: true,
      activeUser: userID,
    }, () => console.log(this.state));
  }

  render() {
    const { isLoggedIn, activeUser } = this.state;
    return (
      <Router>
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
        <Route name='dashboard' exact path='/dashboard' render={Dashboard} />
      </Router>
    );
  }
}

export default App