import React, { Component } from 'react';
import Form from './Form';

class UpdateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      categories: [],
    };
    this.submitUpdateRecipe = this.submitUpdateRecipe.bind(this);
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
        const { title, description, categories } = data;
        this.setState({
          title,
          description,
          categories,
        });
      })
      .catch((err) => {
        console.log(err);
        push('/home');
      });
  }

  submitUpdateRecipe(e, recipe) {
    e.preventDefault();
    const { activeUser, history, match } = this.props;
    const { push } = history || {};
    const { params } = match || {};
    const { id } = params || {};
    const { title, description, categories } = recipe;

    if (!title || !description) {
      return false;
    }

    fetch(`/api/recipes/${id}?user=${activeUser}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
        categories,
      }),
    })
      .then(r => r.json())
      .then(() => push('/dashboard'))
      .catch(err => console.error(err));
    return true;
  }

  render() {
    const { title, description, categories } = this.state;
    const recipe = {
      title,
      description,
      categories,
    };
    return (
      <Form
        recipe={recipe}
        handleSubmit={this.submitUpdateRecipe}
      />
    );
  }
}

export default UpdateRecipe;
