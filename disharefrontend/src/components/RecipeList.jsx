import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const RecipeList = ({ recipes = [], onLike }) => {
  return (
    <div className="recipe-list">
      {recipes.map((r, idx) => (
        <RecipeCard key={r.id || idx} recipe={r} onLike={onLike} />
      ))}
    </div>
  );
};

export default RecipeList;
