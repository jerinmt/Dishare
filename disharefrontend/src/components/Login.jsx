import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Login = () => {
  return (
    <>
      <Navbar />
      <div className="auth-container">
        <h2 className="page-title">Login</h2>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <button type="submit" className="btn btn-primary">Sign In</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;