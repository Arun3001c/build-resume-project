import React from 'react';
import './Card.css';

export const Card = ({ children, className = '', onClick, ...props }) => {
  return (
    <div 
      className={`card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...props}
    >
      {children}
    </div>
  );
};