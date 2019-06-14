import React, { Component } from 'react';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputVal: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, key) {
    const { value } = e.target;
    this.setState({ [key]: value });
  }

  render() {
    const { logIn } = this.props;
    const { inputVal } = this.state;
    return (
      <div>
        <form onSubmit={e => logIn(e, inputVal)}>
          <input
            type='text'
            name='inputVal'
            placeholder='Username (email)'
            value={inputVal}
            onChange={e => this.handleChange(e, "inputVal")}
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    );
  }
}

export default Home;
