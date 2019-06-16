import React from 'react';
import Category from './Category';

function Categories(props) {
  const { deleteCategory, categories } = props;
  return (
    categories.map((c, i) => (
      <Category key={c} category={c} handleDelete={() => deleteCategory(i)} />
    ))
  );
}

export default Categories;
