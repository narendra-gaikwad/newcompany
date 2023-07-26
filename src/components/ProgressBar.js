// components/ProgressBar.js
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="container-p">
      <div className="form-heading">
        <h1>Registration Form</h1>
      </div>
      <div className="progress-bar">
        <div
          className="progress"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
