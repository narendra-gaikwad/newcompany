// components/Step.js
import React from "react";

const Step = ({ isVisible, children }) => {
  return isVisible ? <div className="step">{children}</div> : null;
};

export default Step;
