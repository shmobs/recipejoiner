import React from 'react';
import Category from './Category';

function Categories(props) {
  const { includeDelete, deleteCategory, categories } = props;
  let cats;
  if (includeDelete === 'true') {
    cats = categories.map((c, i) => (<Category key={c} category={c} includeDelete={includeDelete} handleDelete={() => deleteCategory(i)} />));
  } else {
    cats = categories.map((c, i) => (<Category key={c} category={c} includeDelete={includeDelete} />));
  }

  return (
    <div className='flex flex-wrap mb-2'>
      { cats }
    </div>
  );
}

export default Categories;
