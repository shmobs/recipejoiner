import React, { Component } from 'react';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    fetch('/api/categories')
      .then(r => r.json())
      .then((data) => {
        this.setState({ categories: data.categories });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { categories } = this.state;
    const mappedCategories = categories.map(category => <li key={category}>{category}</li>);

    return (
      <div>
        <h1>Categories</h1>
        <ul>{mappedCategories}</ul>
      </div>
    );
  }
}

export default Dashboard;
