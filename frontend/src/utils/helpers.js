// src/utils/helpers.js

// Generate unique ID
export const generateId = () => {
  return 'id_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Format date from YYYY-MM to Month Year
export const formatDate = (dateStr) => {
  if (!dateStr || dateStr.trim() === '') return '';
  
  try {
    const [year, month] = dateStr.split('-');
    const date = new Date(year, month - 1);
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
};

// Format date range for work experience
export const formatDateRange = (startDate, endDate, current = false) => {
  const startFormatted = formatDate(startDate);
  const endFormatted = current ? 'Present' : formatDate(endDate);
  
  if (!startFormatted) return '';
  if (!endFormatted) return startFormatted;
  
  return `${startFormatted} - ${endFormatted}`;
};

// Validate email
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number (basic validation)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

// Truncate text with ellipsis
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Capitalize first letter of each word
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

// Convert base64 to file object
export const base64ToFile = (base64, filename) => {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  
  return new File([u8arr], filename, { type: mime });
};

// Debounce function for search/input
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Calculate resume completeness percentage
export const calculateCompleteness = (resumeData) => {
  const fields = [
    { value: resumeData.personalInfo.fullName, weight: 10 },
    { value: resumeData.personalInfo.email, weight: 10 },
    { value: resumeData.personalInfo.phone, weight: 10 },
    { value: resumeData.personalInfo.location, weight: 5 },
    { value: resumeData.summary, weight: 15 },
    { value: resumeData.workExperience.length > 0 ? resumeData.workExperience[0].position : '', weight: 20 },
    { value: resumeData.education.length > 0 ? resumeData.education[0].degree : '', weight: 15 },
    { value: resumeData.skills.length > 0, weight: 15 }
  ];

  let totalWeight = 0;
  let filledWeight = 0;

  fields.forEach(field => {
    totalWeight += field.weight;
    if (field.value && (typeof field.value !== 'boolean' || field.value === true)) {
      filledWeight += field.weight;
    }
  });

  return Math.round((filledWeight / totalWeight) * 100);
};

// Get initials from name
export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

// Sanitize HTML for display
export const sanitizeHTML = (html) => {
  if (typeof window === 'undefined') return html;
  
  // Simple sanitization - in production, use a library like DOMPurify
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
};

// Convert array to comma separated string
export const arrayToCommaString = (arr) => {
  if (!Array.isArray(arr)) return '';
  return arr.filter(item => item && item.trim() !== '').join(', ');
};

// Parse comma separated string to array
export const commaStringToArray = (str) => {
  if (!str) return [];
  return str
    .split(',')
    .map(item => item.trim())
    .filter(item => item !== '');
};

// Check if object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

// Deep clone object
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

// Get current year
export const getCurrentYear = () => {
  return new Date().getFullYear();
};

// Get current month in YYYY-MM format
export const getCurrentMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  return `${year}-${month}`;
};