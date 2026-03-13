import React, { useMemo, useState } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Searchbar from './Searchbar.jsx';
import RecipeList from './RecipeList.jsx';

const SORT_OPTIONS = [
  { value: 'mostRecent', label: 'Most recent' },
  { value: 'mostViews', label: 'Most views' },
  { value: 'mostLikes', label: 'Most likes' },
];

const SearchResults = ({ recipes = [] }) => {
  const [sortBy, setSortBy] = useState('mostRecent');

  const sortedRecipes = useMemo(() => {
    const list = [...recipes];
    return list.sort((a, b) => {
      if (sortBy === 'mostViews') {
        return (b.viewCount || 0) - (a.viewCount || 0);
      }
      if (sortBy === 'mostLikes') {
        return (b.likes || 0) - (a.likes || 0);
      }
      // mostRecent (fallback if missing dates)
      const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return bTime - aTime;
    });
  }, [recipes, sortBy]);

  return (
    <>
      <Navbar />
      <div className="search-container">
        <h2 className="page-title">Explore Recipes</h2>
        <p className="page-subtitle">Discover popular and recent recipes from the community.</p>

        <div className="explore-toolbar">
          <Searchbar />
          <div className="sort-wrapper">
            <label htmlFor="sortBy">Sort by</label>
            <select
              id="sortBy"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <RecipeList recipes={sortedRecipes} />
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;