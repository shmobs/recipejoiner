import React from 'react';
import Category from './Category';

function Categories(props) {
  const { deleteCategory, categories } = props;
  const cats = categories.map((c, i) => (<Category key={c} category={c} handleDelete={() => deleteCategory(i)} />));
  return (
    <div className='flex flex-wrap mb-2'>
      { cats }
    </div>
  );
}

export default Categories;
