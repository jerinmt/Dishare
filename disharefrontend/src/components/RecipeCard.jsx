import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getMediaUrl } from '../utils/apiClient';

const RecipeCard = ({ recipe, onLike }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (recipe?.id) {
      navigate(`/recipe/${recipe.id}`);
    }
  };

  const handleLike = (event) => {
    event.stopPropagation();
    if (onLike) {
      onLike(recipe.id);
    }
  };

  return (
    <div
      className="recipe-card"
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyPress={(event) => {
        if (event.key === 'Enter') handleCardClick();
      }}
    >
      <img
        src={getMediaUrl(recipe.image) || 'https://via.placeholder.com/300x200'}
        alt={recipe.name || 'Recipe image'}
        className="recipe-card-image"
      />
      <h3 className="recipe-card-title">{recipe.name || 'Untitled Recipe'}</h3>
      <div className="recipe-card-meta">
        <span className="likes-count">❤️ {recipe.likes || 0} likes</span>
        <button type="button" className="btn btn-sm btn-outline-primary" onClick={handleLike}>
          Like
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
