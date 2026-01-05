import React, { useState, useEffect, useRef } from 'react';
import './Select.css';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';

const Select = ({ 
  children,
  value,
  onValueChange,
  ...props 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onValueChange?.(value);
    setIsOpen(false);
  };

  const childrenArray = React.Children.toArray(children);
  const trigger = childrenArray.find(child => child.type === SelectTrigger);
  const content = childrenArray.find(child => child.type === SelectContent);

  return (
    <div className="select" ref={selectRef} {...props}>
      {React.cloneElement(trigger, {
        onClick: () => setIsOpen(!isOpen),
        children: (
          <>
            <span className="select-value">
              {trigger.props.children || selectedValue || 'Select...'}
            </span>
            <ChevronDown className="select-icon" />
          </>
        )
      })}
      
      {isOpen && React.cloneElement(content, {
        children: content.props.children.map(child => 
          React.cloneElement(child, {
            onClick: () => handleSelect(child.props.value),
            className: `select-item ${child.props.className || ''} ${selectedValue === child.props.value ? 'selected' : ''}`,
          })
        ),
        onClose: () => setIsOpen(false)
      })}
    </div>
  );
};

const SelectTrigger = ({ className = '', children, ...props }) => {
  return (
    <button className={`select-trigger ${className}`} {...props}>
      {children}
    </button>
  );
};

const SelectContent = ({ className = '', children, ...props }) => {
  return (
    <div className={`select-content ${className}`} {...props}>
      {children}
    </div>
  );
};

const SelectItem = ({ className = '', children, ...props }) => {
  return (
    <div className={`select-item ${className}`} {...props}>
      {children}
      <Check className="select-check-icon" />
    </div>
  );
};

const SelectLabel = ({ className = '', children, ...props }) => {
  return (
    <div className={`select-label ${className}`} {...props}>
      {children}
    </div>
  );
};

const SelectGroup = ({ className = '', children, ...props }) => {
  return (
    <div className={`select-group ${className}`} {...props}>
      {children}
    </div>
  );
};

const SelectSeparator = ({ className = '', ...props }) => {
  return <div className={`select-separator ${className}`} {...props} />;
};

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectGroup,
  SelectSeparator,
  Select as Root,
  SelectTrigger as Trigger,
  SelectContent as Content,
  SelectItem as Item,
  SelectLabel as Label,
  SelectGroup as Group,
  SelectSeparator as Separator,
};