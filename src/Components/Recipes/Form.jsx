import React, { Component } from 'react';
import Categories from './Categories';

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
    this.fileInputRef = React.createRef();
    this.handleSimpleTextBoxChange = this.handleSimpleTextBoxChange.bind(this);
    this.handleCategoriesChange = this.handleCategoriesChange.bind(this);
    this.handleSubmitWrapper = this.handleSubmitWrapper.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
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
        console.log('category', category);
        const newCategories = category.split(',').map(item => item.trim());
        console.log('new cats', newCategories);
        const AllCategories = [...categories, ...newCategories];
        console.log('all cats', AllCategories);
        const newCategoriesState = [...new Set(AllCategories)]; // Want only unique categories
        console.log('new categories', newCategoriesState);
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
    const file = this.fileInputRef.current.files[0];
    const recipe = { categories, title, description, file };
    const { handleSubmit } = this.props;
    handleSubmit(e, recipe);
  }

  deleteCategory(ind) {
    const { categories } = this.state;
    const newCategories = categories.splice(ind, 1);

    this.setState = ({ categories: newCategories || [] });
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
        <br />
        <input
          name='description'
          value={description}
          onChange={this.handleSimpleTextBoxChange}
          placeholder='Recipe Description'
        />
        <br />
        <input
          name='category'
          value={category}
          onChange={this.handleCategoriesChange}
          placeholder='Enter categories, separated by comma'
        />
        <br />
        <input
          name='image'
          type='file'
          ref={this.fileInputRef}
        />
        <br />
        <Categories categories={categories} deleteCategory={this.deleteCategory} />
        <br />
        <button type='submit'><b>Submit</b></button>
      </form>
    );
  }
}

export default Form;
