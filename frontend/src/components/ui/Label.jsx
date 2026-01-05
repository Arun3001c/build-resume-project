import React from 'react';
import './Label.css';

const Label = React.forwardRef(({ 
  className = '', 
  htmlFor,
  children,
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      htmlFor={htmlFor}
      className={`label ${className}`}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;