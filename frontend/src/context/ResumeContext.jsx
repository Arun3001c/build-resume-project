// src/context/ResumeContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { mockResumeData } from '../utils/mock';
import { generateId, formatDate } from '../utils/helpers';

const ResumeContext = createContext();

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within ResumeProvider');
  }
  return context;
};

export const ResumeProvider = ({ children }) => {
  // Get or generate userId
  const getUserId = () => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = generateId();
      localStorage.setItem('userId', userId);
    }
    return userId;
  };

  // Initialize state from localStorage or mock data
  const [resumeData, setResumeData] = useState(() => {
    try {
      const saved = localStorage.getItem('resumeData');
      const userId = getUserId();
      
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all arrays exist
        return {
          ...mockResumeData,
          ...parsed,
          userId, // Always include userId
          personalInfo: { ...mockResumeData.personalInfo, ...parsed.personalInfo },
          workExperience: parsed.workExperience || mockResumeData.workExperience,
          education: parsed.education || mockResumeData.education,
          skills: parsed.skills || mockResumeData.skills,
          projects: parsed.projects || mockResumeData.projects,
          certifications: parsed.certifications || mockResumeData.certifications,
          languages: parsed.languages || mockResumeData.languages
        };
      }
    } catch (error) {
      console.error('Error loading saved resume:', error);
    }
    return { ...mockResumeData, userId: getUserId() };
  });

  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    const saved = localStorage.getItem('selectedTemplate');
    return saved || null;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Save to localStorage whenever resumeData changes
  useEffect(() => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
      if (selectedTemplate) {
        localStorage.setItem('selectedTemplate', selectedTemplate);
      } else {
        localStorage.removeItem('selectedTemplate');
      }
      setLastSaved(new Date());
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [resumeData, selectedTemplate]);

  // Save to backend
  const saveToBackend = useCallback(async () => {
    try {
      const userId = localStorage.getItem('userId') || generateId();
      localStorage.setItem('userId', userId);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

      const response = await fetch(`${API_URL}/api/resume`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          ...resumeData,
          selectedTemplate,
          lastUpdated: new Date().toISOString()
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Saved to backend:', data);
        return data;
      }
    } catch (error) {
      console.error('Error saving to backend:', error);
    }
  }, [resumeData, selectedTemplate]);

  // Auto-save to backend every 30 seconds if there are changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSaving) {
        setIsSaving(true);
        saveToBackend().finally(() => {
          setIsSaving(false);
        });
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isSaving, saveToBackend]);

  // Update functions
  const updateResumeData = useCallback((updater) => {
    setResumeData(prev => {
      const newData = typeof updater === 'function' ? updater(prev) : updater;
      return newData;
    });
  }, []);

  const updatePersonalInfo = useCallback((data) => {
    console.log('📝 Updating personal info:', data);
    updateResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, ...data }
    }));
  }, [updateResumeData]);

  const updateSummary = useCallback((summary) => {
    updateResumeData(prev => ({ ...prev, summary }));
  }, [updateResumeData]);

  const updateWorkExperience = useCallback((workExperience) => {
    updateResumeData(prev => ({ ...prev, workExperience }));
  }, [updateResumeData]);

  const addWorkExperience = useCallback(() => {
    updateResumeData(prev => ({
      ...prev,
      workExperience: [
        ...prev.workExperience,
        {
          id: generateId(),
          position: '',
          company: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  }, [updateResumeData]);

  const removeWorkExperience = useCallback((id) => {
    updateResumeData(prev => ({
      ...prev,
      workExperience: prev.workExperience.filter(exp => exp.id !== id)
    }));
  }, [updateResumeData]);

  const updateEducation = useCallback((education) => {
    updateResumeData(prev => ({ ...prev, education }));
  }, [updateResumeData]);

  const addEducation = useCallback(() => {
    updateResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: generateId(),
          degree: '',
          institution: '',
          location: '',
          graduationDate: '',
          gpa: ''
        }
      ]
    }));
  }, [updateResumeData]);

  const removeEducation = useCallback((id) => {
    updateResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  }, [updateResumeData]);

  const updateSkills = useCallback((skills) => {
    updateResumeData(prev => ({ ...prev, skills }));
  }, [updateResumeData]);

  const addSkill = useCallback((skill) => {
    updateResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, skill]
    }));
  }, [updateResumeData]);

  const removeSkill = useCallback((skillToRemove) => {
    updateResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  }, [updateResumeData]);

  const updateProjects = useCallback((projects) => {
    updateResumeData(prev => ({ ...prev, projects }));
  }, [updateResumeData]);

  const addProject = useCallback(() => {
    updateResumeData(prev => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          id: generateId(),
          name: '',
          description: '',
          technologies: '',
          link: ''
        }
      ]
    }));
  }, [updateResumeData]);

  const removeProject = useCallback((id) => {
    updateResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(proj => proj.id !== id)
    }));
  }, [updateResumeData]);

  const updateCertifications = useCallback((certifications) => {
    updateResumeData(prev => ({ ...prev, certifications }));
  }, [updateResumeData]);

  const addCertification = useCallback(() => {
    updateResumeData(prev => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          id: generateId(),
          name: '',
          issuer: '',
          date: ''
        }
      ]
    }));
  }, [updateResumeData]);

  const removeCertification = useCallback((id) => {
    updateResumeData(prev => ({
      ...prev,
      certifications: prev.certifications.filter(cert => cert.id !== id)
    }));
  }, [updateResumeData]);

  const updateLanguages = useCallback((languages) => {
    updateResumeData(prev => ({ ...prev, languages }));
  }, [updateResumeData]);

  const addLanguage = useCallback(() => {
    updateResumeData(prev => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          id: generateId(),
          name: '',
          proficiency: ''
        }
      ]
    }));
  }, [updateResumeData]);

  const removeLanguage = useCallback((id) => {
    updateResumeData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang.id !== id)
    }));
  }, [updateResumeData]);

  const updateOptionalFields = useCallback((field, value) => {
    updateResumeData(prev => ({ ...prev, [field]: value }));
  }, [updateResumeData]);

  const updateProfilePhoto = useCallback((profilePhoto) => {
    updateResumeData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, profilePhoto }
    }));
  }, [updateResumeData]);

  const handleSetSelectedTemplate = useCallback((template) => {
    console.log('🔄 Template changing from', selectedTemplate, 'to', template);
    setSelectedTemplate(template);
    updateResumeData(prev => ({ ...prev, selectedTemplate: template }));
  }, [updateResumeData, selectedTemplate]);

  const resetResume = useCallback(() => {
    if (window.confirm('Are you sure you want to reset your resume? This action cannot be undone.')) {
      setResumeData(mockResumeData);
      setSelectedTemplate('modern');
      localStorage.removeItem('resumeData');
      localStorage.removeItem('selectedTemplate');
      window.toast({
        title: 'Resume Reset',
        description: 'Your resume has been reset to default values.'
      });
    }
  }, []);

  const exportResumeData = useCallback(() => {
    const data = {
      ...resumeData,
      selectedTemplate,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `resume_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [resumeData, selectedTemplate]);

  const importResumeData = useCallback((data) => {
    try {
      // Validate the imported data
      if (!data.personalInfo || !data.workExperience || !Array.isArray(data.workExperience)) {
        throw new Error('Invalid resume data format');
      }

      setResumeData({
        ...mockResumeData,
        ...data,
        personalInfo: { ...mockResumeData.personalInfo, ...data.personalInfo },
        workExperience: data.workExperience || mockResumeData.workExperience,
        education: data.education || mockResumeData.education,
        skills: data.skills || mockResumeData.skills,
        projects: data.projects || mockResumeData.projects,
        certifications: data.certifications || mockResumeData.certifications,
        languages: data.languages || mockResumeData.languages
      });

      if (data.selectedTemplate) {
        setSelectedTemplate(data.selectedTemplate);
      }

      window.toast({
        title: 'Import Successful',
        description: 'Resume data has been imported successfully.'
      });
    } catch (error) {
      console.error('Error importing resume:', error);
      window.toast({
        title: 'Import Failed',
        description: 'Failed to import resume data. Please check the file format.'
      });
    }
  }, []);

  // Calculate resume completeness percentage
  const calculateCompleteness = useCallback(() => {
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
  }, [resumeData]);

  const value = {
    // State
    resumeData,
    selectedTemplate,
    isSaving,
    lastSaved,
    
    // Update functions
    updatePersonalInfo,
    updateSummary,
    updateWorkExperience,
    addWorkExperience,
    removeWorkExperience,
    updateEducation,
    addEducation,
    removeEducation,
    updateSkills,
    addSkill,
    removeSkill,
    updateProjects,
    addProject,
    removeProject,
    updateCertifications,
    addCertification,
    removeCertification,
    updateLanguages,
    addLanguage,
    removeLanguage,
    updateOptionalFields,
    updateProfilePhoto,
    setSelectedTemplate: handleSetSelectedTemplate,
    
    // Actions
    resetResume,
    exportResumeData,
    importResumeData,
    saveToBackend,
    
    // Computed values
    completenessPercentage: calculateCompleteness(),
    formattedLastSaved: lastSaved ? formatDate(lastSaved.toISOString()) : null
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
      {isSaving && (
        <div className="auto-save-indicator">
          <div className="save-spinner"></div>
          <span>Auto-saving...</span>
        </div>
      )}
    </ResumeContext.Provider>
  );
};