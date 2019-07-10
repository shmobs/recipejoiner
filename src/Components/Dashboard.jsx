import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      recipes: [],
      filters: [],
    };

    this.filterByCategory = this.filterByCategory.bind(this);
  }

  componentDidMount() {
    const { activeUser: user } = this.props;

    fetch(`/api/categories?user=${user}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({ categories: data.categories });
      })
      .catch(err => console.log(err));

    fetch(`/api/recipes?user=${user}`)
      .then(r => r.json())
      .then((data) => {
        this.setState({ recipes: data });
      })
      .catch(err => console.log(err));
  }

  filterByCategory(categoryName) {
    const { filters } = this.state;
    let newFilters;
    if (filters.includes(categoryName)) {
      const index = filters.indexOf(categoryName);
      const before = filters.slice(0, index);
      const after = filters.slice(index + 1, filters.length - 1);
      newFilters = [...before, ...after];
    } else {
      newFilters = [...filters, categoryName];
    }

    this.setState({ filters: newFilters });
  }

  render() {
    const { categories } = this.state;
    const mappedCategories = categories.map(category => (
      <span key={category}>
        <button
          type='button'
          className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
          onClick={() => this.filterByCategory(category)}
        >
          {category}
        </button>
      </span>
    ));

    const { recipes, filters } = this.state;
    const filteredRecipes = filters.length === 0
      ? recipes
      : recipes.filter((recipe) => {
        let show = false;
        const { categories: recipeCategories } = recipe;
        for (let i = 0; i < filters.length && !show; i++) {
          if (recipeCategories != null && recipeCategories.includes(filters[i])) {
            show = true;
          }
        }
        return show;
      });
    const mappedRecipes = filteredRecipes.map(recipe => (
      <div key={recipe.recipe_id}>
        {console.log(recipe)}
        <Link
          to={`/recipes/${recipe.recipe_id}`}
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
              {
                recipe.categories.map(category => (
                  <span
                    key={category}
                    className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
                  >
                    {category}
                  </span>

                ))

              }
            </div>
          </div>
        </Link>
      </div>
    ));

    return (
      <div className='p-12'>
        <div>
          <h1 className='font-bold text-xl'>Categories</h1><br />
          <ul>{mappedCategories}</ul>
        </div>
        <br />
        <div>
          <h1 className='font-bold text-xl'>Recipes</h1><br />
          <div className='flex inline-flex flex-wrap -mx-3 mb-3'>
            {mappedRecipes}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
