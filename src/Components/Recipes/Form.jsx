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
    this.handleSubmitWrapper = this.handleSubmitWrapper.bind(this);
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

    // If the string has a comma in it, clear the input and add the current category(ies) to the 'categories' array
    if (category.includes(',')) {
      this.setState({ category: '' });
      // Make sure that there is something OTHER than a comma as well
      if (category.length > 1) {
        // want the current 'category' (or multiple), but without the comma at the end. Also, remove any leading/trailing whitespace
        const newCategories = category.split(',').map(item => item.trim());
        const newCategoriesState = [...categories, ...newCategories];
        this.setState({ categories: newCategoriesState });
      }
    } else {
      this.setState({
        category,
      });
    }
  }

  handleSubmitWrapper(e) {
    const { categories, title, description } = this.state;
    const recipe = { categories, title, description };
    const { handleSubmit } = this.props;
    handleSubmit(e, recipe)
  }

  render() {
    const { category, categories, title, description } = this.state;
    return (
      <form onSubmit={this.handleSubmitWrapper}>
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
