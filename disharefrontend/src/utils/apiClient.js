import axios from 'axios';
import { store } from '../store/store';

// Base configuration for all API calls
const backendURL = 'http://localhost:8080';
const baseURL = `${backendURL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: baseURL,
});

export const getMediaUrl = (path) => {
  if (!path) return path;
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/')) {
    return `${backendURL}${path}`;
  }
  return `${backendURL}/${path}`;
};

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - could dispatch logout action here
      console.warn('Unauthorized - token may be expired');
    }
    return Promise.reject(error);
  }
);

// ==================== Auth Services ====================
export const authService = {
  register: (userData) => apiClient.post('/register', userData),
  login: (email, password) => apiClient.post('/login', { email, password }),
  logout: () => apiClient.post('/logout'),
};

// ==================== User Services ====================
export const userService = {
  getUser: (userId) => apiClient.get(`/user/${userId}`),
  
  updateProfile: (userId, formData) => {
    return apiClient.put(`/user/${userId}`, formData);
  },

  changePassword: (userId, payload) => apiClient.put(`/user/${userId}/password`, payload),

  getUserRecipes: (userId) => apiClient.get(`/user/${userId}/recipes`),
};

// ==================== Recipe Services ====================
export const recipeService = {
  listRecipes: () => apiClient.get('/listrecipe'),

  getRecipe: (recipeId) => apiClient.get(`/recipe/${recipeId}`),

  createRecipe: (formData) => apiClient.post('/addrecipe', formData),

  updateRecipe: (recipeId, formData) => apiClient.put(`/updaterecipe/${recipeId}`, formData),

  deleteRecipe: (recipeId) => apiClient.delete(`/deleterecipe/${recipeId}`),

  likeRecipe: (recipeId) => apiClient.post(`/recipe/${recipeId}/like`),

  searchRecipes: (keyword) => apiClient.get('/searchrecipe', {
    params: { keyword },
  }),
};

// ==================== Error Helper ====================
/**
 * Extract error message from API response
 * Handles various error response formats
 */
export const getErrorMessage = (error) => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.response?.data?.error) {
    return error.response.data.error;
  }
  if (error.response?.data?.errors) {
    // Handle array of errors
    const errors = error.response.data.errors;
    if (Array.isArray(errors)) {
      return errors[0];
    }
    if (typeof errors === 'object') {
      return Object.values(errors)[0];
    }
  }
  if (error.message) {
    return error.message;
  }
  return 'An error occurred. Please try again.';
};

export default apiClient;
