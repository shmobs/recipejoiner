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
        &nbsp;<b>x</b>&nbsp;&nbsp;
      </button>
    </span>
  );
}

export default Category;
