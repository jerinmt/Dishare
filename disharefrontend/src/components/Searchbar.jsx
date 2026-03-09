import React from 'react';

const Searchbar = () => {
  return (
    <div className="searchbar-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search recipes..."
      />
      <button className="btn btn-primary">Search</button>
    </div>
  );
};

export default Searchbar;
