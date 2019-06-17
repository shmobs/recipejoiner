import React from 'react';

function Category(props) {
  const { category, handleDelete } = props;
  return (
    <span
      className='bg-green-500 text-white rounded py-2 px-2 mr-2 mb-2'
    >
      {category}
      <button
        type='button'
        onClick={handleDelete}
      >
        &nbsp;<b>x</b>
      </button>
    </span>
  );
}

export default Category;
