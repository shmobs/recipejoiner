import React from 'react';

function DeleteRecipe(props) {
  const { data, push } = props;

  function deleteRecipe() {
    const { recipe_id: recipeID, user_id: userID } = data;

    fetch(`/api/recipes/${recipeID}?user=${userID}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(r => r.json())
      .then(() => push('/dashboard'))
      .catch(err => console.error(err));
    return true;
  }

  return (
    <button type='button' onClick={deleteRecipe}>Delete</button>
  );
}

export default DeleteRecipe;
