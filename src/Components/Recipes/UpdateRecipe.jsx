import React, { Component } from 'react';
import Form from './Form';

class UpdateRecipe extends Component {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match || {};
    const { id } = params || {};

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { match, activeUser: user } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    const { history } = this.props;
    const { push } = history;

    // load recipe if exists, otherwise send Home
    fetch(`/api/recipes/${id}?user=${user}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch((err) => {
        console.log(err);
        push('/home');
      });
  }

  submitUpdateRecipe(e) {
    e.preventDefault();
    const { activeUser, history } = this.props;
    const { push } = history;
    const { data: recipe } = this.state;
    const { title, description } = recipe || {};

    if (!title || !description) {
      return false;
    }

    fetch(`/api/recipes?user=${activeUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(r => r.json())
      .then(() => push('/dashboard'))
      .catch(err => console.error(err));
    return true;
  }

  render() {
    const { data: recipe } = this.state;
    return (
      <Form
        recipe={recipe}
        handleSubmit={this.submitUpdateRecipe}
      />
    );
  }
}

export default UpdateRecipe;
