import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const ProfileEdit = () => {
  return (
    <>
      <Navbar />
      <div className="profile-form-container">
        <h2 className="page-title">Edit Profile</h2>
        <form>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" />
          </div>
          <div>
            <label htmlFor="bio">Bio:</label>
            <textarea id="bio" name="bio" rows="3"></textarea>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" />
          </div>
          <div>
            <label htmlFor="image">Profile Picture URL:</label>
            <input type="text" id="image" name="image" />
          </div>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;