// src/components/preview/ResumePreview.jsx
import React, { useMemo } from 'react';
import { useResume } from '../../context/ResumeContext';
import ModernTemplate from './templates/ModernTemplate';
import ClassicTemplate from './templates/ClassicTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import TechnicalTemplate from './templates/TechnicalTemplate';
import './ResumePreview.css';

const ResumePreview = () => {
  const { selectedTemplate, resumeData } = useResume();

  // Use useMemo to ensure template re-renders when selectedTemplate or resumeData changes
  const renderTemplate = useMemo(() => {
    // Force component re-creation by using key prop with selectedTemplate
    switch (selectedTemplate) {
      case 'modern':
        return <ModernTemplate key={`modern-${resumeData.userId || 'default'}`} />;
      case 'classic':
        return <ClassicTemplate key={`classic-${resumeData.userId || 'default'}`} />;
      case 'minimal':
        return <MinimalTemplate key={`minimal-${resumeData.userId || 'default'}`} />;
      case 'executive':
        return <ExecutiveTemplate key={`executive-${resumeData.userId || 'default'}`} />;
      case 'creative':
        return <CreativeTemplate key={`creative-${resumeData.userId || 'default'}`} />;
      case 'technical':
        return <TechnicalTemplate key={`technical-${resumeData.userId || 'default'}`} />;
      default:
        return <ModernTemplate key={`modern-${resumeData.userId || 'default'}`} />;
    }
  }, [selectedTemplate, resumeData]);

  return (
    <div className="resume-preview-container">
      <div className="preview-header">
        <h3 className="preview-title">Live Preview</h3>
        <div className="preview-controls">
          <span className="template-badge">
            Template: {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
          </span>
        </div>
      </div>
      <div className="preview-content">
        <div className="a4-paper" key={selectedTemplate}>
          {renderTemplate}
        </div>
      </div>
      <div className="preview-footer">
        <p className="preview-note">
          This preview shows how your resume will look when printed or downloaded.
          Actual print/download may have minor variations.
        </p>
      </div>
    </div>
  );
};

export default ResumePreview;