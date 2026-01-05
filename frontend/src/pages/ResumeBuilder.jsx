// src/pages/ResumeBuilder.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Download, Eye, EyeOff } from 'lucide-react';
import PersonalInfoForm from '../components/forms/PersonalInfoForm';
import SummaryForm from '../components/forms/SummaryForm';
import WorkExperienceForm from '../components/forms/WorkExperienceForm';
import EducationForm from '../components/forms/EducationForm';
import SkillsForm from '../components/forms/SkillsForm';
import ProjectsForm from '../components/forms/ProjectsForm';
import CertificationsForm from '../components/forms/CertificationsForm';
import LanguagesForm from '../components/forms/LanguagesForm';
import OptionalFieldsForm from '../components/forms/OptionalFieldsForm';
import ResumePreview from '../components/preview/ResumePreview';
import { useResume } from '../context/ResumeContext';
import { downloadDOCX, saveResumeSession } from '../utils/pdfExport';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { resumeData } = useResume();
  const [showPreview, setShowPreview] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Generate a session ID with timestamp
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Save resume to MongoDB with session ID
      const saveResponse = await saveResumeSession(resumeData, sessionId);
      console.log('✅ Resume saved to MongoDB:', saveResponse);
      
      // Generate filename
      const filename = resumeData.personalInfo?.fullName 
        ? resumeData.personalInfo.fullName.replace(/\s+/g, '_') 
        : 'resume';
      
      // Download the DOCX file
      await downloadDOCX(resumeData, filename);
      
      // Show success message
      if (window.toast) {
        window.toast({
          title: "Download Successful",
          description: `Resume downloaded successfully! Session ID: ${saveResponse.sessionId}`,
        });
      }
      
      console.log('✅ DOCX downloaded successfully');
      console.log('📝 Session Details:', {
        sessionId: saveResponse.sessionId,
        userId: saveResponse.userId,
        timestamp: new Date().toISOString()
      });
      
    } catch (error) {
      console.error('❌ Error downloading resume:', error);
      if (window.toast) {
        window.toast({
          title: "Download Failed",
          description: "Failed to download resume. Please try again.",
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="resume-builder-page">
      {/* Header */}
      <header className="builder-header">
        <div className="container header-container">
          <div className="header-left">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/templates')}
              className="change-template-btn"
            >
              <ArrowLeft className="btn-icon" />
              Change Template
            </Button>
          </div>
          
          <div className="header-right">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="toggle-preview-btn"
            >
              {showPreview ? <EyeOff className="btn-icon" /> : <Eye className="btn-icon" />}
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button 
              onClick={handleDownload}
              disabled={isDownloading}
              className="download-btn"
            >
              <Download className="btn-icon" />
              {isDownloading ? 'Downloading...' : 'Download DOCX'}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container main-container">
        <div className="builder-content">
          {/* Forms Section */}
          <div className="forms-section">
            <PersonalInfoForm />
            <SummaryForm />
            <WorkExperienceForm />
            <EducationForm />
            <SkillsForm />
            <ProjectsForm />
            <CertificationsForm />
            <LanguagesForm />
            <OptionalFieldsForm />
          </div>

          {/* Preview Section */}
          {showPreview && (
            <div className="preview-section">
              <ResumePreview />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;