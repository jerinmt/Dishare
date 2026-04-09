import { createSlice } from '@reduxjs/toolkit';

const storedUser = localStorage.getItem('user');
const parsedUser = storedUser ? JSON.parse(storedUser) : null;

const initialState = {
  email: parsedUser?.email || '',
  token: parsedUser?.token || '',
  user: parsedUser,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, token } = action.payload;
      state.email = email;
      state.token = token;
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);
    },
    logout: (state) => {
      state.email = '';
      state.token = '';
      state.user = null;
      localStorage.removeItem('user');
      localStorage.removeItem('email');
      localStorage.removeItem('token');
    },
    setUserFromLocalStorage: (state) => {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        state.user = parsed;
        state.email = parsed.email || '';
        state.token = parsed.token || '';
      } else {
        state.user = null;
        state.email = '';
        state.token = '';
      }
    },
  },
});

export const { login, logout, setUserFromLocalStorage } = authSlice.actions;
export default authSlice.reducer;
