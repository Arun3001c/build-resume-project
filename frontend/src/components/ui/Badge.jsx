import React from 'react';
import './Badge.css';

const Badge = ({ 
  className = '',
  variant = 'default',
  children,
  ...props 
}) => {
  return (
    <div 
      className={`badge badge-${variant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Badge;