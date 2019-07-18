import React from 'react';

function Ingredient(props) {
  const { ingredient, inputFormat, handleChangeIngredients } = props;
  return (
    <input
      className={inputFormat}
      name='ingredient'
      value={ingredient}
      placeholder='A building block of your recipe'
      onChange={handleChangeIngredients}
    />
  );
}

export default Ingredient;
