import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, fetchUserRecipes } from '../store/userSlice';
import { likeRecipe } from '../store/recipeSlice';
import { recipeService } from '../utils/apiClient';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import UserImage from './UserImage.jsx';
import RecipeList from './RecipeList.jsx';

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser: user, userRecipes, loading, error } = useSelector((state) => state.user);
  const currentUser = useSelector((state) => state.auth.user);

  const [exploreRecipes, setExploreRecipes] = useState([]);
  const [exploreLoading, setExploreLoading] = useState(false);
  const [exploreError, setExploreError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const fetchAllRecipes = async () => {
    setExploreLoading(true);
    setExploreError(null);
    try {
      const response = await recipeService.listRecipes();
      setExploreRecipes(response.data || []);
    } catch (err) {
      setExploreError('Failed to load explore recipes.');
    } finally {
      setExploreLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchUserProfile(id));
    dispatch(fetchUserRecipes(id));
    fetchAllRecipes();
  }, [id, dispatch]);

  const isOwnProfile = currentUser && currentUser.id == id;

  const handleLike = async (recipeId) => {
    try {
      await dispatch(likeRecipe(recipeId)).unwrap();
    } catch (err) {
      console.error('Failed to like recipe:', err);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchQuery.trim()) {
      await fetchAllRecipes();
      return;
    }
    setExploreLoading(true);
    setExploreError(null);
    try {
      const response = await recipeService.searchRecipes(searchQuery.trim());
      setExploreRecipes(response.data || []);
    } catch (err) {
      setExploreError('Failed to search recipes.');
    } finally {
      setExploreLoading(false);
    }
  };

  const sortedExploreRecipes = useMemo(() => {
    return [...exploreRecipes].sort((a, b) => {
      if (sortOption === 'newest') {
        return new Date(b.createdDate) - new Date(a.createdDate);
      }
      if (sortOption === 'oldest') {
        return new Date(a.createdDate) - new Date(b.createdDate);
      }
      if (sortOption === 'mostLiked') {
        return (b.likes || 0) - (a.likes || 0);
      }
      if (sortOption === 'mostViewed') {
        return (b.views || 0) - (a.views || 0);
      }
      return 0;
    });
  }, [exploreRecipes, sortOption]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <p>Loading user...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !user) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <p className="error-message">{error || 'User not found'}</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <UserImage src={user.pic} alt={user.username} />
        <h1 className="profile-name">{user.username}</h1>
        {user.bio && <p className="profile-bio">{user.bio}</p>}

        {isOwnProfile && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/profile/edit/${id}`)}
            style={{ marginBottom: '20px' }}
          >
            Edit Profile
          </button>
        )}

        <div className="profile-section">
          <h2>My Recipes</h2>
          <RecipeList recipes={userRecipes || []} onLike={handleLike} />
        </div>

        <div className="profile-section explore-section">
          <div className="explore-header">
            <div>
              <h2>Explore Recipes</h2>
              <p>Search and sort all recipes by newest additions.</p>
            </div>
            <form className="explore-controls" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Search recipes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <select
                className="sort-select"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="mostLiked">Most liked</option>
                <option value="mostViewed">Most viewed</option>
              </select>
            </form>
          </div>

          {exploreLoading && <p>Loading explore recipes...</p>}
          {exploreError && <p className="error-message">{exploreError}</p>}
          {!exploreLoading && !exploreError && (
            <RecipeList recipes={sortedExploreRecipes} onLike={handleLike} />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;