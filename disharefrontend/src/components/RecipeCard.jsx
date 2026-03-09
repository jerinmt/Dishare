import React from 'react';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <img
        src={recipe.imageUrl || 'https://via.placeholder.com/300x200'}
        alt={recipe.title}
        className="recipe-card-image"
      />
      <h3 className="recipe-card-title">{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
