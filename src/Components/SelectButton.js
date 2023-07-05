import React, { useState } from 'react';

const SelectButton = ({ children, selected, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const buttonStyle = {
    border: "1px solid gold",
    borderRadius: "5px",
    padding: "10px",
    paddingLeft: "20px",
    paddingRight: "20px",
    cursor: "pointer",
    backgroundColor: selected || hovered ? "gold" : "",
    color: selected || hovered ? "black" : "",
    fontWeight: selected ? 700 : 500,
    width: "22%",
  };

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="select">
      <span
        className="selectButton"
        style={buttonStyle}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </span>
    </div>
  );
};

export default SelectButton;
