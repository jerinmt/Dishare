import React from 'react';

const UserImage = ({ src, alt }) => {
  return (
    <div className="user-image-wrapper">
      <img
        src={src || 'https://via.placeholder.com/150'}
        alt={alt || 'User'}
        className="user-image"
      />
    </div>
  );
};

export default UserImage;
