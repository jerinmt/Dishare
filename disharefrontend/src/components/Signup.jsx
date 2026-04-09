import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { authService, getErrorMessage } from '../utils/apiClient';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
    
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== passwordConf) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const user = {
        username: name,
        email: email,
        password: password,
      };

      await authService.register(user);
      setErrorMessage('');
      navigate('/login');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2 className="page-title">Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={name}
              onInput={(event)=>setName(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onInput={(event)=>setEmail(event.target.value)}
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
              onInput={(event)=>setPassword(event.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordConf}
              onInput={(event)=>setPasswordConf(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-sign">Sign Up</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Signup;