import React from 'react';
import Form from './Form';

function submitNewRecipe(e, recipe) {
  e.preventDefault();
  console.log('in submit', recipe);
  const { title, description } = recipe || {};

  if (!title || !description) {
    return false; // Returning false from a submit function prevents the form from being sumitted
  }

  fetch('/api/recipes', {
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

function CreateRecipe() {
  return (
    <Form
      handleSubmit={submitNewRecipe}
    />
  );
}

export default CreateRecipe;
