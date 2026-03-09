import React from 'react';
import RecipeCard from './RecipeCard.jsx';

const RecipeList = ({ recipes = [] }) => {
  return (
    <div className="recipe-list">
      {recipes.map((r, idx) => (
        <RecipeCard key={r.id || idx} recipe={r} />
      ))}
    </div>
  );
};

export default RecipeList;
