import React, { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchRecipes, likeRecipe, clearError } from '../store/recipeSlice';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import Searchbar from './Searchbar.jsx';
import RecipeList from './RecipeList.jsx';

const SORT_OPTIONS = [
  { value: 'mostRecent', label: 'Most recent' },
  { value: 'mostViews', label: 'Most views' },
  { value: 'mostLikes', label: 'Most likes' },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const keyword = searchParams.get('q') || '';
  const { searchResults: recipes = [], loading, error } = useSelector((state) => state.recipes);
  const [sortBy, setSortBy] = useState('mostRecent');

  // Fetch search results when keyword changes
  useEffect(() => {
    if (keyword.trim()) {
      dispatch(searchRecipes(keyword));
    } else {
      dispatch(clearError());
    }
  }, [keyword, dispatch]);

  const sortedRecipes = useMemo(() => {
    const list = [...recipes];
    return list.sort((a, b) => {
      if (sortBy === 'mostViews') {
        return (b.views || 0) - (a.views || 0);
      }
      if (sortBy === 'mostLikes') {
        return (b.likes || 0) - (a.likes || 0);
      }
      // mostRecent (default sorting)
      const aTime = a.createdDate ? new Date(a.createdDate).getTime() : 0;
      const bTime = b.createdDate ? new Date(b.createdDate).getTime() : 0;
      return bTime - aTime;
    });
  }, [recipes, sortBy]);

  const handleLike = async (recipeId) => {
    try {
      await dispatch(likeRecipe(recipeId)).unwrap();
    } catch (err) {
      console.error('Failed to like recipe:', err);
      // Optionally show error to user
    }
  };

  return (
    <>
      <Navbar />
      <div className="search-container">
        <h2 className="page-title">Explore Recipes</h2>
        <p className="page-subtitle">Discover popular and recent recipes from the community.</p>

        {error && <div className="error-message">{error}</div>}
        {loading && <p>Searching...</p>}

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

        {keyword && recipes.length === 0 && !loading && (
          <p>No recipes found for "{keyword}"</p>
        )}
        {!keyword && <p>Enter a search query to find recipes</p>}

        <RecipeList recipes={sortedRecipes} onLike={handleLike} />
      </div>
      <Footer />
    </>
  );
};

export default SearchResults;