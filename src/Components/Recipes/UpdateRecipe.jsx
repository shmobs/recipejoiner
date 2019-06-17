import React, { Component } from 'react';
import Form from './Form';

class UpdateRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      categories: [],
      imageURL: '',
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
        const { title, description, categories, image_url: imageURL } = data;
        this.setState({
          title,
          description,
          categories: categories.split(','),
          imageURL,
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
    const { title, description, categories, file, imageURL } = recipe;

    if (!title || !description) {
      return false;
    }
    console.log('submittied recipe:', recipe);

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('categories', categories);
    data.append('image', file);
    data.append('imageURL', imageURL);

    fetch(`/api/recipes/${id}?user=${activeUser}`, {
      method: 'PUT',
      body: data,
    })
      .then(r => r.json())
      .then(() => push(`/recipes/${id}`))
      .catch(err => console.error(err));
    return true;
  }

  render() {
    const { title, description, categories, imageURL } = this.state;
    const recipe = {
      title,
      description,
      categories,
      imageURL,
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
