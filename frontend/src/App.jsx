// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ResumeProvider } from './context/ResumeContext';
import LandingPage from './pages/LandingPage';
import TemplateSelection from './pages/TemplateSelection';
import ResumeBuilder from './pages/ResumeBuilder';
import './App.css';

// Toast Notification Component
const Toast = ({ toast, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div className={`toast toast-${toast.type || 'info'}`}>
      <strong className="toast-title">{toast.title}</strong>
      {toast.description && (
        <p className="toast-description">{toast.description}</p>
      )}
      <button 
        className="toast-close" 
        onClick={() => onClose(toast.id)}
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

// Global toast function - accessible from anywhere
window.toast = (options) => {
  const event = new CustomEvent('show-toast', { 
    detail: {
      id: Date.now(),
      ...options,
      type: options.type || 'info'
    }
  });
  window.dispatchEvent(event);
};

function App() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handleToast = (event) => {
      const newToast = event.detail;
      setToasts(prev => [...prev, newToast]);
    };

    window.addEventListener('show-toast', handleToast);
    return () => window.removeEventListener('show-toast', handleToast);
  }, []);

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ResumeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplateSelection />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      {/* Toast Container */}
      <div className="toast-container" id="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ResumeProvider>
  );
}

export default App;