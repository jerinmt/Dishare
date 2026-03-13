import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import './ProfileEdit.css';

const ProfileEdit = () => {
  return (
    <>
      <Navbar />
      <div className="profile-edit-page">
        <div className="profile-edit-container">
          <h2 className="page-title profile-edit-title">Edit Profile</h2>
          <p className="page-subtitle profile-edit-subtitle">
            Update your details and profile picture.
          </p>
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
          <div className="profile-edit-actions">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfileEdit;