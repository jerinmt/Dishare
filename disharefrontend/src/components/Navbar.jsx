import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { authService } from '../utils/apiClient';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const isLoggedIn = Boolean(currentUser);
  const homeLink = currentUser?.id ? `/profile/${currentUser.id}` : '/';
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
    }
    dispatch(logout());
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to={homeLink} className="navbar-logo">
        🍳 Dishare
      </Link>
      <button
        type="button"
        className="nav-toggle"
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`nav-links ${menuOpen ? 'nav-links--open' : ''}`}>
        <Link to={homeLink} className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        {isLoggedIn && (
          <Link to="/create" className="nav-link" onClick={() => setMenuOpen(false)}>
            Add Recipe
          </Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link
              to="/login"
              className="nav-link btn btn-secondary"
              onClick={() => setMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        ) : (
          <button type="button" className="nav-link btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;