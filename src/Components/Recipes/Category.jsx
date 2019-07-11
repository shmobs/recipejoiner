import React from 'react';

function Category(props) {
  const { category, handleDelete, includeDelete } = props;
  let deleteButton = (
    <button
      type='button'
      onClick={handleDelete}
    >
      &nbsp;<b>x</b>
    </button>
  );
  if (includeDelete !== 'true') deleteButton = '';
  return (
    <span
      className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2'
    >
      {category}
      {deleteButton}
    </span>
  );
}

export default Category;
