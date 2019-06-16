import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.logIn = this.logIn.bind(this);
  }

  componentWillMount() {
    const { isLoggedIn, history } = this.props;
    const { push } = history;

    if (isLoggedIn) {
      push('/dashboard');
    }
  }

  handleChange(e, key) {
    const { value } = e.target;
    this.setState({ [key]: value });
  }

  logIn(e) {
    const { logIn, history } = this.props;
    const { push } = history;
    const { inputVal } = this.state;
    // this is the logIn function that was passed down through props, not a recursive call
    logIn(e, inputVal, () => push('/dashboard'));
  }

  render() {
    const { inputVal } = this.state;
    return (
      <div>
        <form onSubmit={this.logIn}>
          <input
            type='text'
            name='inputVal'
            placeholder='Username (email)'
            value={inputVal}
            onChange={e => this.handleChange(e, 'inputVal')}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
}

export default Home;
