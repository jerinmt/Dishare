import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { recipeService } from '../utils/apiClient';

// Async thunks for async actions
export const fetchRecipeById = createAsyncThunk(
  'recipes/fetchRecipeById',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await recipeService.getRecipe(recipeId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch recipe');
    }
  }
);

export const createRecipe = createAsyncThunk(
  'recipes/createRecipe',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await recipeService.createRecipe(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create recipe');
    }
  }
);

export const updateRecipe = createAsyncThunk(
  'recipes/updateRecipe',
  async ({ recipeId, formData }, { rejectWithValue }) => {
    try {
      const response = await recipeService.updateRecipe(recipeId, formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update recipe');
    }
  }
);

export const likeRecipe = createAsyncThunk(
  'recipes/likeRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      const response = await recipeService.likeRecipe(recipeId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to like recipe');
    }
  }
);

export const deleteRecipe = createAsyncThunk(
  'recipes/deleteRecipe',
  async (recipeId, { rejectWithValue }) => {
    try {
      await recipeService.deleteRecipe(recipeId);
      return recipeId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete recipe');
    }
  }
);

export const searchRecipes = createAsyncThunk(
  'recipes/searchRecipes',
  async (keyword, { rejectWithValue }) => {
    try {
      const response = await recipeService.searchRecipes(keyword);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to search recipes');
    }
  }
);

const initialState = {
  recipes: [],
  currentRecipe: null,
  searchResults: [],
  loading: false,
  error: null,
  success: false,
};

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentRecipe: (state, action) => {
      state.currentRecipe = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch recipe by ID
    builder.addCase(fetchRecipeById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentRecipe = action.payload;
    });
    builder.addCase(fetchRecipeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Create recipe
    builder.addCase(createRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes.push(action.payload);
      state.success = true;
    });
    builder.addCase(createRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Update recipe
    builder.addCase(updateRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateRecipe.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
      state.currentRecipe = action.payload;
      state.success = true;
    });
    builder.addCase(updateRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Like recipe
    builder.addCase(likeRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(likeRecipe.fulfilled, (state, action) => {
      state.loading = false;
      if (state.currentRecipe && state.currentRecipe.id === action.payload.id) {
        state.currentRecipe = action.payload;
      }
      const index = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (index !== -1) {
        state.recipes[index] = action.payload;
      }
    });
    builder.addCase(likeRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Delete recipe
    builder.addCase(deleteRecipe.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteRecipe.fulfilled, (state, action) => {
      state.loading = false;
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      state.success = true;
    });
    builder.addCase(deleteRecipe.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Search recipes
    builder.addCase(searchRecipes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(searchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { clearError, clearSuccess, setCurrentRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;
