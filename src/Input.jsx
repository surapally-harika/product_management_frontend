
import React from "react";



function Input({ onInputChange }) {
  const handleChange = (event) => {
    onInputChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="userInput"></label>
      <input
        type="text"
        id="userInput"
        placeholder="Start typing..."
        onChange={handleChange}
      />
    </div>
  );
}

export default Input;