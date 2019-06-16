import React from 'react';

function Category(props) {
  const { category, handleDelete } = props;
  return (
    <span>
      {category}
      <button
        type='button'
        onClick={handleDelete}
      >
        x
      </button>
    </span>
  );
}

export default Category;
