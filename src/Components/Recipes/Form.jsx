import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props);
    const { recipe } = props;
    const { categories, title, description } = recipe || {};
    this.state = {
      category: '',
      categories: categories || [],
      title: title || '',
      description: description || '',
    };
    this.handleSimpleTextBoxChange = this.handleSimpleTextBoxChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { recipe: newRecipe } = this.props;
    const { recipe: oldRecipe } = prevProps;
    if (newRecipe !== oldRecipe) {
      const { categories, title, description } = newRecipe || {};
      this.setState({
        category: '',
        categories: categories || [],
        title: title || '',
        description: description || '',
      });
    }
  }

  handleSimpleTextBoxChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleCategoriesChange(e) {
    const { value: category } = e.target;
    const { categories } = this.state;

    // If the last character in the string is a comma, clear the input and add the current category to the 'categories' array
    if (category[category.length - 1] === ',') {
      this.setState({ category: '' });
      // Make sure that there is something OTHER than a comma as well
      if (category.length > 1) {
        // want the current 'category', but without the comma at the end. Also, remove any leading/trailing whitespace
        const newCategories = [...categories, category.substring(0, category.length - 1).trim()];
        this.setState({ categories: newCategories });
      }
    } else {
      this.setState({
        category,
      });
    }
  }

  render() {
    const { category, categories, title, description } = this.state;
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <input
          name='title'
          value={title}
          onChange={this.handleSimpleTextBoxChange}
          placeholder='Recipe Title'
        />
        <input
          name='description'
          value={description}
          onChange={this.handleSimpleTextBoxChange}
          placeholder='Recipe Description'
        />
        <input
          name='category'
          value={category}
          onChange={this.handleCategoriesChange}
          placeholder='Enter categories, separated by comma'
        />
        <br />
        {/* will need to actually format this */}
        <p>
          Categories:
          {categories}
        </p>
        <button type='submit'><b>Submit</b></button>
      </form>
    );
  }
}

export default Form;
