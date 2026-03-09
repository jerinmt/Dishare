import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import RecipeImage from './RecipeImage.jsx';
import IngredientList from './IngredientList.jsx';
import Steps from './Steps.jsx';
import './ViewRecipe.css';

const ViewRecipe = ({ recipe }) => {
  if (!recipe) {
    return <div className="view-recipe-container">Loading...</div>;
  }

  const { title, imageUrl, viewCount, ingredients, steps, cookingTime, difficulty } = recipe;

  return (
    <>
      <Navbar />
      <div className="view-recipe-container">
        <RecipeImage
          title={title}
          imageUrl={imageUrl}
          viewCount={viewCount}
          cookingTime={cookingTime}
          difficulty={difficulty}
        />

        <div className="section">
          <h2>Ingredients</h2>
          <IngredientList ingredients={ingredients} />
        </div>

        <div className="section">
          <h2>Preparation Steps</h2>
          <Steps steps={steps} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ViewRecipe;