import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Searchbar from './Searchbar.jsx';
import RecipeList from './RecipeList.jsx';

const SearchResults = ({ recipes = [] }) => {
  return (
    <>
      <Navbar />
      <div className="search-container">
        <Searchbar />
        <RecipeList recipes={recipes} />
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;