import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // TODO: Replace with real auth state when backend is connected
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // placeholder logout behaviour
    setIsLoggedIn(false);
    console.log('Logged out');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
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
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
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