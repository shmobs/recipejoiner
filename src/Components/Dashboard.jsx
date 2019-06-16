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

    // const newFilters = [];
    // filters.forEach(filter => newFilters.push(filter))
    // newFilters.push(categoryName)
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
          onClick={() => this.filterByCategory(category)}
        >
          {category}
        </button>
      </span>
    ));

    const { recipes, filters } = this.state;
    const filteredRecipes = recipes.filter((recipe) => {
      let show = false;
      const { categories: recipeCategories } = recipe;
      for (let i = 0; i < filters.length && !show; i++) {
        if (recipeCategories.includes(filters[i])) {
          show = true;
        }
      }
      return show;
    });
    const mappedRecipes = filteredRecipes.map(recipe => (
      <li key={recipe.recipe_id}>
        <Link
          to={`/recipes/${recipe.recipe_id}`}
        >
          {recipe.title}
        </Link>
      </li>
    ));

    return (
      <div>
        <div>
          <h1>Categories</h1>
          <ul>{mappedCategories}</ul>
        </div>
        <div>
          <h1>Recipes</h1>
          <ul>{mappedRecipes}</ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;
