import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, deleteRecipe, likeRecipe } from '../store/recipeSlice';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import RecipeImage from './RecipeImage.jsx';
import IngredientList from './IngredientList.jsx';
import Steps from './Steps.jsx';
import './ViewRecipe.css';

const ViewRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRecipe: recipe, loading, error } = useSelector((state) => state.recipes);
  const currentUser = useSelector((state) => state.auth.user);

  // Fetch recipe on mount
  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [id, dispatch]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await dispatch(deleteRecipe(id)).unwrap();
        alert('Recipe deleted successfully');
        navigate('/');
      } catch (err) {
        alert('Failed to delete recipe: ' + err);
      }
    }
  };

  const handleLike = async () => {
    try {
      await dispatch(likeRecipe(id)).unwrap();
    } catch (err) {
      alert('Failed to like recipe: ' + err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="view-recipe-container">
          <p>Loading...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (error || !recipe) {
    return (
      <>
        <Navbar />
        <div className="view-recipe-container">
          <p className="error-message">{error || 'Recipe not found'}</p>
        </div>
        <Footer />
      </>
    );
  }

  // Parse ingredients and steps (they're delimited by '|' in DB)
  const ingredients = typeof recipe.ingredients === 'string'
    ? recipe.ingredients.split('|').map((i) => i.trim()).filter(Boolean)
    : recipe.ingredients || [];

  const steps = typeof recipe.steps === 'string'
    ? recipe.steps.split('|').map((s) => s.trim()).filter(Boolean)
    : recipe.steps || [];

  // Check if current user is the recipe owner
  const isOwner = currentUser && recipe.userId && currentUser.id === recipe.userId;

  return (
    <>
      <Navbar />
      <div className="view-recipe-container">
        <RecipeImage
          title={recipe.name}
          imageUrl={recipe.image}
          viewCount={recipe.views || 0}
          cookingTime={recipe.cookingTime}
          difficulty={recipe.difficulty}
        />

        <div className="recipe-meta-summary" style={{ marginTop: '16px', marginBottom: '24px' }}>
          <div>
            <strong>Author:</strong> {recipe.username || 'Unknown'}
          </div>
          <div>
            <strong>Published:</strong>{' '}
            {recipe.createdDate ? new Date(recipe.createdDate).toLocaleDateString() : 'N/A'}
          </div>
          <div>
            <strong>Likes:</strong> {recipe.likes || 0}
          </div>
          <button type="button" className="btn btn-secondary" onClick={handleLike}>
            Like Recipe
          </button>
        </div>

        {isOwner && (
          <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate(`/edit/${id}`)}
            >
              Edit Recipe
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleDelete}
            >
              Delete Recipe
            </button>
          </div>
        )}

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