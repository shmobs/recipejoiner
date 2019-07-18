import React from 'react';
import Ingredient from './Ingredient';

function Ingredients(props) {
  const { ingredients, inputFormat, handleChangeIngredients } = props;
  console.log(ingredients);
  const mappedIngredients = ingredients.map((ing, i) => (
    <Ingredient
      key={i}
      ingredient={ing}
      inputFormat={inputFormat}
      handleChangeIngredients={handleChangeIngredients}
    />
  ));
  return (
    <div>
      { mappedIngredients }
    </div>
  );
}

export default Ingredients;
