// src/components/preview/templates/index.jsx
import ModernTemplate from './ModernTemplate';
import ClassicTemplate from './ClassicTemplate';
import MinimalTemplate from './MinimalTemplate';
import ExecutiveTemplate from './ExecutiveTemplate';
import CreativeTemplate from './CreativeTemplate';
import TechnicalTemplate from './TechnicalTemplate';

export {
  ModernTemplate,
  ClassicTemplate,
  MinimalTemplate,
  ExecutiveTemplate,
  CreativeTemplate,
  TechnicalTemplate
};

// Helper function to render the correct template
export const renderTemplate = (templateName, resumeData) => {
  switch (templateName) {
    case 'modern':
      return <ModernTemplate resumeData={resumeData} />;
    case 'classic':
      return <ClassicTemplate resumeData={resumeData} />;
    case 'minimal':
      return <MinimalTemplate resumeData={resumeData} />;
    case 'executive':
      return <ExecutiveTemplate resumeData={resumeData} />;
    case 'creative':
      return <CreativeTemplate resumeData={resumeData} />;
    case 'technical':
      return <TechnicalTemplate resumeData={resumeData} />;
    default:
      return <ModernTemplate resumeData={resumeData} />;
  }
};

// Get template display name
export const getTemplateDisplayName = (templateName) => {
  const names = {
    modern: 'Modern Professional',
    classic: 'Classic Traditional',
    minimal: 'Minimal Clean',
    executive: 'Executive Premium',
    creative: 'Creative Modern',
    technical: 'Technical Pro'
  };
  return names[templateName] || 'Modern Professional';
};