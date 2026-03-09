import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const CreateRecipe = () => {
  return (
    <>
      <Navbar />
      <div className="recipe-form-container">
        <h2 className="page-title">Create New Recipe</h2>
        {/* form fields for creating would go here */}
        <p>Form to create a recipe will be implemented here.</p>
      </div>
      <Footer />
    </>
  );
};

export default CreateRecipe;