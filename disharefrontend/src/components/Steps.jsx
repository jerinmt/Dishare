import React from 'react';

const Steps = ({ steps }) => {
  return (
    <div className="steps-list">
      {steps.map((step, idx) => (
        <div key={idx} className="step-item">
          <div className="step-number">{idx + 1}</div>
          <div className="step-content">
            <p className="step-description">{step}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Steps;