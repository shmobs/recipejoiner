import React from 'react';
import Form from './Form';

function CreateRecipe(props) {

  const { activeUser } = props;

  function submitNewRecipe(e, recipe) {
    e.preventDefault();
    const { title, description } = recipe || {};

    if (!title || !description) {
      return false; // Returning false from a submit function prevents the form from being sumitted
    }

    fetch(`/api/recipes?user=${activeUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    })
      .then(r => r.json())
      .then(console.log)
      .catch(err => console.error(err));
    return true;
  }

  return (
    <Form
      handleSubmit={submitNewRecipe}
    />
  );
}

export default CreateRecipe;
