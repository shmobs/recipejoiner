import React from 'react';
import Ingredient from './Ingredient';

function Ingredients(props) {
  const { ingredients, inputFormat, handleChangeIngredients } = props;
  const addIngredient = (
    <button 
      className='w-1/6 bg-blue-500 hover:bg-blue-700 text-white
      font-bold py-3 px-4 mb-3 leading-tight rounded inline-flex items-center'
    >
      <svg className='fill-current w-4 h-4 mr-2'
           xmlns='http://www.w3.org/2000/svg'
           viewBox='0 0 20 20'
       >
         <path d='M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z'/>
       </svg>
      <span>Add Another</span>
    </button>
    )
  const mappedIngredients = ingredients.map((ing, i) => (
    <div className='flex items-center py-2'>
      <Ingredient
        key={i}
        ingredient={ing}
        inputFormat={inputFormat}
        handleChangeIngredients={handleChangeIngredients}
      />
      &nbsp;&nbsp;
      {i === ingredients.length - 1 ? addIngredient : ''}
     </div>
  ));
  return (
    <div>
      { mappedIngredients }
    </div>
  );
}

export default Ingredients;
