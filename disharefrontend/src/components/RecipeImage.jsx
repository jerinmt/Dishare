import React from 'react';
import { getMediaUrl } from '../utils/apiClient';

const RecipeImage = ({
  imageUrl,
  title,
  cookingTime,
  difficulty,
  viewCount,
}) => {
  const imageSrc = getMediaUrl(imageUrl) || 'https://via.placeholder.com/600x400';
  // determine difficulty class
  const difficultyClass = {
    easy: 'difficulty-easy',
    medium: 'difficulty-medium',
    hard: 'difficulty-hard',
  }[difficulty.toLowerCase()] || '';

  return (
    <div className="recipe-header">
      <img src={imageSrc} alt={title} className="recipe-image" />
      <div className="recipe-info">
        <h1 className="recipe-title">{title}</h1>
        <div className="recipe-meta">
          <div className="meta-item">
            <span className="meta-label">Cooking Time:</span>
            <span className="meta-value">{cookingTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Difficulty:</span>
            <span className={`difficulty-badge ${difficultyClass}`}>{difficulty}</span>
          </div>
        </div>
        <div className="view-count">
          👁️ <strong>{viewCount}</strong> people have viewed this recipe
        </div>
      </div>
    </div>
  );
};

export default RecipeImage;