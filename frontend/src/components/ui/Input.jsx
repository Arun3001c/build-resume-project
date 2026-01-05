import React from 'react';
import './Input.css';

export const Input = ({ className = '', type = 'text', ...props }) => {
  return (
    <input
      type={type}
      className={`form-input ${className}`}
      {...props}
    />
  );
};