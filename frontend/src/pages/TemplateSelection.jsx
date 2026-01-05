// src/pages/TemplateSelection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ArrowLeft, Check } from 'lucide-react';
import { TEMPLATE_DISPLAY_NAMES } from '../utils/constants';
import './TemplateSelection.css';

const templates = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean layout with subtle accent colors',
    color: '#2563eb'
  },
  {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Timeless design for conservative industries',
    color: '#1e293b'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Simple and elegant with maximum readability',
    color: '#0f172a'
  },
  {
    id: 'executive',
    name: 'Executive Premium',
    description: 'Sophisticated layout for senior positions',
    color: '#1e293b'
  },
  {
    id: 'creative',
    name: 'Creative Modern',
    description: 'Bold design for creative professionals',
    color: '#7c3aed'
  },
  {
    id: 'technical',
    name: 'Technical Pro',
    description: 'Optimized for technical roles and IT professionals',
    color: '#0f172a'
  }
];

const TemplateSelection = () => {
  const navigate = useNavigate();
  const { selectedTemplate, setSelectedTemplate } = useResume();

  const handleTemplateSelect = (templateId) => {
    console.log('🎨 Template selected:', templateId);
    setSelectedTemplate(templateId);
    // Auto-navigate to builder after selecting template
    setTimeout(() => {
      navigate('/builder');
    }, 300); // Small delay for visual feedback
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/builder');
    }
  };

  return (
    <div className="template-selection-page">
      {/* Header */}
      {/* <header className="template-header">
        <div className="container header-container">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="back-btn"
          >
            <ArrowLeft className="back-icon" />
            Back
          </Button>
          <Button 
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="continue-btn"
          >
            Continue to Builder
          </Button>
        </div>
      </header> */}

      {/* Main Content */}
      <div className="container main-container">
        <div className="page-header">
          <h1 className="page-title">Choose Your Template</h1>
          <p className="page-subtitle">
            Select a template that best fits your industry and style
          </p>
        </div>

        <div className="templates-grid">
          {templates.map((template) => (
            <Card
              key={template.id}
              className={`template-card ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => handleTemplateSelect(template.id)}
            >
              <div className="template-preview">
                <div 
                  className="template-color-bar"
                  style={{ backgroundColor: template.color }}
                ></div>
                <div className="template-content">
                  <div className="template-name-large">{template.name}</div>
                  <div className="template-preview-text">Preview</div>
                </div>
                
                {selectedTemplate === template.id && (
                  <div className="selected-indicator">
                    <Check className="check-icon" />
                  </div>
                )}
              </div>
              
              <div className="template-info">
                <h3 className="template-name">{template.name}</h3>
                <p className="template-description">{template.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* <div className="continue-section">
          <Button 
            onClick={handleContinue}
            disabled={!selectedTemplate}
            size="lg"
            className="continue-large-btn"
          >
            Continue to Builder
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default TemplateSelection;