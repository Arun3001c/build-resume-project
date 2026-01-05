import React from 'react';
import './Button.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '', 
  disabled = false,
  type = 'button'
}) => {
  const buttonClass = `btn btn-${variant} btn-${size} ${className} ${disabled ? 'btn-disabled' : ''}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};