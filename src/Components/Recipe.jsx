import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DeleteRecipe from './Recipes/DeleteRecipe.jsx';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { match, activeUser: user } = this.props;
    const { params } = match || {};
    const { id } = params || {};

    fetch(`/api/recipes/${id}?user=${user}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({ data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { data } = this.state;
    const { history } = this.props;
    const { push } = history || {};

    return (
      <div>
        <h1>{data.title}</h1>
        <img
          src={data.image_url}
          alt={data.title}
        />
        <p>{data.description}</p>
        <Link to={`/recipes/${data.recipe_id}/edit`}>Edit</Link>
        <DeleteRecipe data={data} push={push} />
      </div>
    );
  }
}

export default Recipe;
