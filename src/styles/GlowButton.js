import React from 'react';
import './GlowButton.css'; // Certifique-se de que o caminho está correto

const GlowButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="glow-button">
      Get Started
    </button>
  );
};

export default GlowButton;
