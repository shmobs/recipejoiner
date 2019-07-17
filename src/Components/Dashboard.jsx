import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from './RecipeCard.jsx';
import Categories from './Recipes/Categories.jsx';

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
    const { categories, recipes, filters } = this.state;
    const mappedCategories = categories.map(category => (
      <span key={category}>
        <button
          type='button'
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 my-2
          ${filters.includes(category) ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700'}`}
          onClick={() => this.filterByCategory(category)}
        >
          {category}
        </button>
      </span>
    ));

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
      <RecipeCard key={recipe.recipe_id} recipe={recipe} />
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
