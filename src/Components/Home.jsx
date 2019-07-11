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
    const inputFormat = 'bg-gray-200 focus:bg-white border-transparent focus:border-blue-400 text-gray-900 appearance-none inline-block w-full text-gray-900 border rounded py-3 px-4 mb-3 focus:outline-none';
    return (
      <div>
        <form onSubmit={this.logIn}>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
            <input
              className={inputFormat}
              type='text'
              name='inputVal'
              placeholder='Username (email)'
              value={inputVal}
              onChange={e => this.handleChange(e, 'inputVal')}
            />
          </div>
          {/* Upload image button */}
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-center block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold border-red-500 rounded py-3 px-4 mb-3 leading-tight'>
              <button type='submit'>Login</button>
            </label>
          </div>
        </form>
      </div>
    );
  }
}

export default Home;
