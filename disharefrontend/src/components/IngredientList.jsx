import React from 'react';
import Ingredient from './Ingredient.jsx';

const IngredientList = ({ ingredients }) => {
  return (
    <div className="ingredients-list">
      {ingredients.map((ing, idx) => (
        <Ingredient key={idx} text={ing} />
      ))}
    </div>
  );
};

export default IngredientList;