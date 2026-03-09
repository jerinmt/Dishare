import React, { useState } from 'react';

const Ingredient = ({ text }) => {
  const [checked, setChecked] = useState(false);

  const toggle = () => setChecked(prev => !prev);

  return (
    <div className="ingredient-item" style={{ opacity: checked ? 0.6 : 1 }}>
      <input
        type="checkbox"
        className="ingredient-checkbox"
        checked={checked}
        onChange={toggle}
      />
      <span className="ingredient-text">{text}</span>
    </div>
  );
};

export default Ingredient;