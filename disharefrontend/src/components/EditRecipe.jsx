import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const EditRecipe = () => {
  return (
    <>
      <Navbar />
      <div className="recipe-form-container">
        <h2 className="page-title">Edit Recipe</h2>
        {/* form fields for editing would go here */}
        <p>Form to update an existing recipe will be implemented here.</p>
      </div>
      <Footer />
    </>
  );
};

export default EditRecipe;