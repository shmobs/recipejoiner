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
      <div className='w-full max-w-xs m-auto'>
            {/*Comment block right below is the old styling - keep for now*/}
{/*        <form onSubmit={this.logIn}>
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
          <div className='w-full md:w-1/2 px-3'>
            <label className='text-center block w-full bg-blue-500 hover:bg-blue-700 text-white font-bold border-red-500 rounded py-3 px-4 mb-3 leading-tight'>
              <button type='submit'>Login</button>
            </label>
          </div>
        </form>*/}

      {/*Commented lines below will be uncommented when we implement passwords and such*/}
        {/*<div className='w-full max-w-xs'>*/}
          <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 bg-gray-200' onSubmit={this.logIn}>
            <div className='mb-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2' for='username'>
                Username
              </label>
              <input onChange={e => this.handleChange(e, 'inputVal')} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username'/>
            </div>
            {/*<div className='mb-6'>
              <label className='block text-gray-700 text-sm font-bold mb-2' for='password'>
                Password
              </label>
              <input className='shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************'/>
              <p className='text-red-500 text-xs italic'>Please choose a password.</p>
            </div>*/}
            <div className='flex items-center justify-between'>
              <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
                Sign In
              </button>
              {/*<a className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='#'>
                Forgot Password?
              </a>*/}
            </div>
          </form>
          <p className='text-center text-gray-500 text-xs'>
            &copy;2019 RecipeJoiner All rights reserved.
          </p>
          {/*</div>*/}
      </div>
    );
  }
}

export default Home;
