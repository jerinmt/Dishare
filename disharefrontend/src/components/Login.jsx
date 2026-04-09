import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { login } from '../store/authSlice';
import { authService, getErrorMessage } from '../utils/apiClient';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await authService.login(email, password);

      const data = response.data;

      if (!data?.token) {
        setError('Login failed: token not returned.');
        return;
      }

      const authUser = {
        id: data.id,
        email: data.email,
        username: data.username,
        token: data.token,
      };

      dispatch(login(authUser));
      navigate(`/profile/${data.id}`);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2 className="page-title">Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="btn btn-primary btn-sign">
            Sign In
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;