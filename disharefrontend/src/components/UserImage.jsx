import React from 'react';
import { getMediaUrl } from '../utils/apiClient';

const UserImage = ({ src, alt }) => {
  const imageUrl = getMediaUrl(src);

  return (
    <div className="user-image-wrapper">
      <img
        src={imageUrl || 'https://via.placeholder.com/150'}
        alt={alt || 'User'}
        className="user-image"
      />
    </div>
  );
};

export default UserImage;
