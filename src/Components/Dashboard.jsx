import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      recipes: [],
    };
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(r => r.json())
      .then((data) => {
        this.setState({ categories: data.categories });
      })
      .catch(err => console.log(err));

    fetch('/api/recipes')
      .then(r => r.json())
      .then((data) => {
        this.setState({ recipes: data });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { categories } = this.state;
    console.log(categories);
    const mappedCategories = categories.map(category => <li key={category}>{category}</li>);

    const { recipes } = this.state;
    console.log(recipes);
    const mappedRecipes = recipes.map((recipe) => {
      return <li key={recipe.recipe_id}>{recipe.title}</li>;
    });

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
