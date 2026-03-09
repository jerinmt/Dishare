import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        🍳 Dishare
      </Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/create" className="nav-link">
          Add Recipe
        </Link>
        <Link to="/login" className="nav-link btn btn-secondary">
          Sign In
        </Link>
        <Link to="/signup" className="nav-link">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;