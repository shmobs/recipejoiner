import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Categories from './Recipes/Categories.jsx';

class RecipeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    const { recipe } = this.props;

    return (
      <div key={recipe.recipe_id} className='p-6'>
        <Link
          to={`/recipe/${recipe.recipe_id}`}
        >
          <div className='max-w-xs rounded overflow-hidden shadow-lg'>
            <img className='w-auto' src={recipe.image_url} alt={recipe.title} />
            <div className='px-6 py-4'>
              <div className='font-bold text-xl mb-2'>{recipe.title}</div>
              <p className='text-gray-700 text-base'>
                {recipe.description}
              </p>
            </div>
            <div className='px-6 py-4'>
              <Categories categories={recipe.categories}/>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default RecipeCard;
