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
      <div className='w-full max-w-md m-auto'>
        <h1 className='font-bold text-xl'>{data.title}</h1>
        <br />
        <img
          src={data.image_url}
          alt={data.title}
        />
        <br />
        <p>{data.description}</p>
        <br />
        <button type='button' className='bg-blue-500 hover:bg-blue-700 text-white font py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
          <Link to={`/recipes/${data.recipe_id}/edit`}>Edit</Link>
        </button>&nbsp;
        <DeleteRecipe data={data} push={push} />
      </div>
    );
  }
}

export default Recipe;
