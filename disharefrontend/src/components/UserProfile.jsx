import React from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import UserImage from './UserImage.jsx';
import RecipeList from './RecipeList.jsx';

const UserProfile = ({ user }) => {
  // purely visual; data will be passed later
  if (!user) {
    return (
      <>
        <Navbar />
        <div className="profile-container">Loading user...</div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <UserImage src={user.imageUrl} alt={user.name} />
        <h1 className="profile-name">{user.name}</h1>
        {user.bio && <p className="profile-bio">{user.bio}</p>}
        <RecipeList recipes={user.recipes || []} />
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;