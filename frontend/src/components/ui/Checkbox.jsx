import React from 'react';
import './Checkbox.css';
import { Check } from 'lucide-react';

const Checkbox = React.forwardRef(({ 
  className = '',
  checked,
  onChange,
  disabled = false,
  ...props 
}, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked || false);

  React.useEffect(() => {
    setIsChecked(checked || false);
  }, [checked]);

  const handleChange = (e) => {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className="checkbox-wrapper">
      <input
        type="checkbox"
        ref={ref}
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className={`checkbox-input ${className}`}
        {...props}
      />
      <div className={`checkbox-indicator ${isChecked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}>
        {isChecked && <Check className="checkbox-check" />}
      </div>
    </div>
  );
});

Checkbox.displayName = 'Checkbox';

export default Checkbox;