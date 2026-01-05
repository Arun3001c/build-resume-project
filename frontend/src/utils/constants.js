// src/utils/constants.js

// Application constants
export const APP_NAME = 'Resume Builder';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Create professional resumes with ease';

// API endpoints
export const API_ENDPOINTS = {
  SAVE_RESUME: '/api/resume',
  GET_RESUME: '/api/resume/:userId',
  HEALTH_CHECK: '/api/health'
};

// Resume sections
export const RESUME_SECTIONS = {
  PERSONAL_INFO: 'personalInfo',
  SUMMARY: 'summary',
  WORK_EXPERIENCE: 'workExperience',
  EDUCATION: 'education',
  SKILLS: 'skills',
  PROJECTS: 'projects',
  CERTIFICATIONS: 'certifications',
  LANGUAGES: 'languages',
  ACHIEVEMENTS: 'achievements',
  INTERESTS: 'interests'
};

// Template names
export const TEMPLATE_NAMES = {
  MODERN: 'modern',
  CLASSIC: 'classic',
  MINIMAL: 'minimal',
  EXECUTIVE: 'executive',
  CREATIVE: 'creative',
  TECHNICAL: 'technical'
};

// Template display names
export const TEMPLATE_DISPLAY_NAMES = {
  [TEMPLATE_NAMES.MODERN]: 'Modern Professional',
  [TEMPLATE_NAMES.CLASSIC]: 'Classic Traditional',
  [TEMPLATE_NAMES.MINIMAL]: 'Minimal Clean',
  [TEMPLATE_NAMES.EXECUTIVE]: 'Executive Premium',
  [TEMPLATE_NAMES.CREATIVE]: 'Creative Modern',
  [TEMPLATE_NAMES.TECHNICAL]: 'Technical Pro'
};

// Color schemes for templates
export const TEMPLATE_COLORS = {
  [TEMPLATE_NAMES.MODERN]: {
    primary: '#2563eb',
    secondary: '#64748b',
    accent: '#3b82f6',
    background: '#ffffff',
    text: '#1e293b'
  },
  [TEMPLATE_NAMES.CLASSIC]: {
    primary: '#1e293b',
    secondary: '#475569',
    accent: '#334155',
    background: '#ffffff',
    text: '#0f172a'
  },
  [TEMPLATE_NAMES.MINIMAL]: {
    primary: '#0f172a',
    secondary: '#64748b',
    accent: '#475569',
    background: '#ffffff',
    text: '#1e293b'
  },
  [TEMPLATE_NAMES.EXECUTIVE]: {
    primary: '#1e293b',
    secondary: '#475569',
    accent: '#334155',
    background: '#f8fafc',
    text: '#0f172a'
  },
  [TEMPLATE_NAMES.CREATIVE]: {
    primary: '#7c3aed',
    secondary: '#8b5cf6',
    accent: '#a78bfa',
    background: '#ffffff',
    text: '#1e293b'
  },
  [TEMPLATE_NAMES.TECHNICAL]: {
    primary: '#0f172a',
    secondary: '#334155',
    accent: '#475569',
    background: '#ffffff',
    text: '#1e293b'
  }
};

// Font families for templates
export const TEMPLATE_FONTS = {
  [TEMPLATE_NAMES.MODERN]: "'Inter', sans-serif",
  [TEMPLATE_NAMES.CLASSIC]: "'Georgia', serif",
  [TEMPLATE_NAMES.MINIMAL]: "'Inter', sans-serif",
  [TEMPLATE_NAMES.EXECUTIVE]: "'Inter', sans-serif",
  [TEMPLATE_NAMES.CREATIVE]: "'Inter', sans-serif",
  [TEMPLATE_NAMES.TECHNICAL]: "'Courier New', monospace"
};

// Proficiency levels for languages
export const PROFICIENCY_LEVELS = [
  { value: 'native', label: 'Native' },
  { value: 'fluent', label: 'Fluent' },
  { value: 'professional', label: 'Professional Working' },
  { value: 'limited', label: 'Limited Working' },
  { value: 'elementary', label: 'Elementary' }
];

// Months for date selection
export const MONTHS = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' }
];

// Years for date selection (last 50 years to next 10 years)
export const YEARS = (() => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 50; i <= currentYear + 10; i++) {
    years.push({ value: i.toString(), label: i.toString() });
  }
  return years.reverse();
})();

// File upload constraints
export const FILE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  MAX_DIMENSIONS: { width: 2000, height: 2000 }
};

// Validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  EMAIL: 'Please enter a valid email address',
  PHONE: 'Please enter a valid phone number',
  URL: 'Please enter a valid URL',
  DATE: 'Please enter a valid date',
  FILE_SIZE: 'File size must be less than 5MB',
  FILE_TYPE: 'Only JPEG, PNG, GIF, and WebP images are allowed'
};

// Local storage keys
export const STORAGE_KEYS = {
  RESUME_DATA: 'resumeData',
  USER_ID: 'resumeUserId',
  SELECTED_TEMPLATE: 'selectedTemplate',
  SESSION_ID: 'resumeSessionId'
};

// Page titles
export const PAGE_TITLES = {
  HOME: 'Resume Builder | Create Professional Resumes',
  TEMPLATES: 'Choose Template | Resume Builder',
  BUILDER: 'Build Your Resume | Resume Builder'
};

// Export formats
export const EXPORT_FORMATS = {
  PDF: 'pdf',
  DOCX: 'docx',
  TXT: 'txt',
  HTML: 'html'
};

// Resume paper sizes
export const PAPER_SIZES = {
  A4: { width: '210mm', height: '297mm' },
  LETTER: { width: '215.9mm', height: '279.4mm' },
  LEGAL: { width: '215.9mm', height: '355.6mm' }
};

// Default resume settings
export const DEFAULT_SETTINGS = {
  paperSize: 'A4',
  margin: '20mm',
  fontSize: '11pt',
  lineHeight: '1.5',
  fontFamily: "'Inter', sans-serif"
};

// Skill categories
export const SKILL_CATEGORIES = [
  { id: 'programming', name: 'Programming Languages' },
  { id: 'frameworks', name: 'Frameworks & Libraries' },
  { id: 'databases', name: 'Databases' },
  { id: 'tools', name: 'Tools & Platforms' },
  { id: 'soft', name: 'Soft Skills' },
  { id: 'languages', name: 'Languages' }
];

// Industry types for resume customization
export const INDUSTRIES = [
  { id: 'tech', name: 'Technology', icon: '💻' },
  { id: 'finance', name: 'Finance', icon: '💰' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥' },
  { id: 'education', name: 'Education', icon: '📚' },
  { id: 'marketing', name: 'Marketing', icon: '📈' },
  { id: 'design', name: 'Design', icon: '🎨' },
  { id: 'engineering', name: 'Engineering', icon: '⚙️' },
  { id: 'business', name: 'Business', icon: '💼' }
];