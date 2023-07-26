import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const CustomDatePickerInput = ({ value, onClick, inputRef }) => (
  <div className="date-picker-input">
    <input
      type="text"
      value={value}
      onClick={onClick}
      readOnly
      ref={inputRef}
    />
    <span className="date-picker-icon" onClick={onClick}>
      <FaCalendarAlt />
    </span>
  </div>
);

export default CustomDatePickerInput;
