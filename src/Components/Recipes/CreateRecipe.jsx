import React from 'react';
import Form from './Form';

function CreateRecipe(props) {
  const { activeUser } = props;

  function submitNewRecipe(e, recipe) {
    e.preventDefault();
    const { title, description, categories, file } = recipe || {};

    if (!title || !description) {
      return false; // Returning false from a submit function prevents the form from being sumitted
    }

    const data = new FormData();
    data.append('title', title);
    data.append('description', description);
    data.append('categories', categories);
    data.append('image', file);

    fetch(`/api/recipes?user=${activeUser}`, {
      method: 'POST',
      redirect: 'follow',
      body: data,
    })
      .then(r => r.json())
      .then((rData) => {
        console.log(rData);
        window.location.href = `/recipes/${rData.recipe_id}`;
      })
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
