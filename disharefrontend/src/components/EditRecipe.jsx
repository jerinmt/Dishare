import React, { useMemo, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipeById, updateRecipe, clearError } from '../store/recipeSlice';
import { getErrorMessage } from '../utils/apiClient';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const EditRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRecipe, loading, error } = useSelector((state) => state.recipes);
  const difficultyOptions = useMemo(() => ['Easy', 'Medium', 'Hard'], []);
  const [successMessage, setSuccessMessage] = useState('');

  const [form, setForm] = useState({
    title: '',
    imageFile: null,
    cookingTime: '',
    difficulty: 'Easy',
    ingredients: [''],
    steps: [''],
  });

  // Fetch recipe on mount
  useEffect(() => {
    dispatch(fetchRecipeById(id));
  }, [id, dispatch]);

  // Pre-fill form when recipe is fetched
  useEffect(() => {
    if (currentRecipe) {
      // Parse ingredients and steps (they're delimited by '|' in DB)
      const ingredients = typeof currentRecipe.ingredients === 'string'
        ? currentRecipe.ingredients.split('|').map((i) => i.trim()).filter(Boolean)
        : currentRecipe.ingredients || [''];

      const steps = typeof currentRecipe.steps === 'string'
        ? currentRecipe.steps.split('|').map((s) => s.trim()).filter(Boolean)
        : currentRecipe.steps || [''];

      setForm({
        title: currentRecipe.name || '',
        imageFile: null,
        cookingTime: currentRecipe.cookingTime || '',
        difficulty: currentRecipe.difficulty || 'Easy',
        ingredients: ingredients.length ? ingredients : [''],
        steps: steps.length ? steps : [''],
      });
    }
  }, [currentRecipe]);

  const updateField = (key) => (e) => {
    const value = e?.target?.value ?? '';
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const updateImage = (e) => {
    const file = e.target.files?.[0] ?? null;
    setForm((prev) => ({ ...prev, imageFile: file }));
  };

  const updateIngredient = (idx) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = [...prev.ingredients];
      next[idx] = value;
      return { ...prev, ingredients: next };
    });
  };

  const addIngredient = () => {
    setForm((prev) => ({ ...prev, ingredients: [...prev.ingredients, ''] }));
  };

  const updateStep = (idx) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      const next = [...prev.steps];
      next[idx] = value;
      return { ...prev, steps: next };
    });
  };

  const addStep = () => {
    setForm((prev) => ({ ...prev, steps: [...prev.steps, ''] }));
  };

  const removeStep = (idx) => () => {
    setForm((prev) => {
      const next = prev.steps.filter((_, i) => i !== idx);
      return { ...prev, steps: next.length ? next : [''] };
    });
  };

  const removeIngredient = (idx) => () => {
    setForm((prev) => {
      const next = prev.ingredients.filter((_, i) => i !== idx);
      return { ...prev, ingredients: next.length ? next : [''] };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');
    dispatch(clearError());

    const ingredients = form.ingredients.map((s) => s.trim()).filter(Boolean);
    const steps = form.steps.map((s) => s.trim()).filter(Boolean);

    if (!form.title || !form.cookingTime || ingredients.length === 0 || steps.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    // Create FormData for multipart/form-data submission
    const formData = new FormData();
    formData.append('name', form.title);
    formData.append('cookingTime', form.cookingTime);
    formData.append('difficulty', form.difficulty);
    formData.append('ingredients', ingredients.join('|')); // Join with delimiter
    formData.append('steps', steps.join('|')); // Join with delimiter
    if (form.imageFile) {
      formData.append('image', form.imageFile);
    }

    try {
      await dispatch(updateRecipe({ recipeId: id, formData })).unwrap();
      setSuccessMessage('Recipe updated successfully!');
      setTimeout(() => {
        navigate(`/recipe/${id}`);
      }, 1000);
    } catch (err) {
      console.error('Failed to update recipe:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="recipe-form-container">
        <h2 className="page-title">Edit Recipe</h2>
        <p className="page-subtitle">Update the recipe details below.</p>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {loading && <p>Loading recipe...</p>}

        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="title">Name of the dish</label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={updateField('title')}
              required
            />
          </div>

          <div>
            <label htmlFor="imageFile">Picture</label>
            <input id="imageFile" name="imageFile" type="file" accept="image/*" onChange={updateImage} />
          </div>

          <div>
            <label htmlFor="cookingTime">Cooking time</label>
            <input
              id="cookingTime"
              name="cookingTime"
              type="text"
              value={form.cookingTime}
              onChange={updateField('cookingTime')}
              required
            />
          </div>

          <div>
            <label htmlFor="difficulty">Difficulty</label>
            <select id="difficulty" name="difficulty" value={form.difficulty} onChange={updateField('difficulty')}>
              {difficultyOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="fieldset-header">
              <label>Ingredients</label>
              <button type="button" className="icon-btn" onClick={addIngredient} aria-label="Add ingredient">
                +
              </button>
            </div>
            {form.ingredients.map((val, idx) => (
              <div key={`ing-${idx}`} style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  value={val}
                  onChange={updateIngredient(idx)}
                  placeholder={`Ingredient ${idx + 1}`}
                  required={idx === 0}
                />
                <button type="button" className="btn btn-remove" onClick={removeIngredient(idx)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div>
            <div className="fieldset-header">
              <label>Cooking steps</label>
              <button type="button" className="icon-btn" onClick={addStep} aria-label="Add cooking step">
                +
              </button>
            </div>
            {form.steps.map((val, idx) => (
              <div key={`step-${idx}`} style={{ display: 'flex', gap: 10 }}>
                <textarea
                  value={val}
                  onChange={updateStep(idx)}
                  rows={2}
                  placeholder={`Step ${idx + 1}`}
                  required={idx === 0}
                />
                <button type="button" className="btn btn-remove" onClick={removeStep(idx)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default EditRecipe;