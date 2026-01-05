import React, { useState, useEffect } from 'react';
import './Toast.css';
import { X } from 'lucide-react';

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { ...toast, id }]);
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <>
      {React.Children.map(children, child => 
        React.cloneElement(child, { addToast })
      )}
      <ToastViewport>
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            variant={toast.variant}
            onClose={() => removeToast(toast.id)}
          >
            {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
            {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            <ToastClose />
            {toast.action && (
              <ToastAction onClick={toast.action.onClick}>
                {toast.action.label}
              </ToastAction>
            )}
          </Toast>
        ))}
      </ToastViewport>
    </>
  );
};

const ToastViewport = ({ className = '', ...props }) => {
  return (
    <div 
      className={`toast-viewport ${className}`}
      {...props}
    />
  );
};

const Toast = React.forwardRef(({ 
  className = '',
  variant = 'default',
  onClose,
  children,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`toast toast-${variant} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

Toast.displayName = 'Toast';

const ToastAction = React.forwardRef(({ 
  className = '',
  onClick,
  children,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`toast-action ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

ToastAction.displayName = 'ToastAction';

const ToastClose = React.forwardRef(({ 
  className = '',
  onClick,
  ...props 
}, ref) => {
  return (
    <button
      ref={ref}
      className={`toast-close ${className}`}
      onClick={onClick}
      {...props}
    >
      <X className="toast-close-icon" />
    </button>
  );
});

ToastClose.displayName = 'ToastClose';

const ToastTitle = React.forwardRef(({ 
  className = '',
  children,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`toast-title ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ToastTitle.displayName = 'ToastTitle';

const ToastDescription = React.forwardRef(({ 
  className = '',
  children,
  ...props 
}, ref) => {
  return (
    <div 
      ref={ref}
      className={`toast-description ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

ToastDescription.displayName = 'ToastDescription';

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};