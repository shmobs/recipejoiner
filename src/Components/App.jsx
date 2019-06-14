import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { broswerHistory } from 'react-router';
import Home from './Home';

class App extends Component {
	render() {
		return (
			<Router>
				<Route name="home" exact path="/" component={/*todo*/} />
			</Router>
			);
	}
}

export default App