// src/pages/ResumeBuilder.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Download, Eye, EyeOff, FileText } from 'lucide-react';
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
  const { resumeData, selectedTemplate } = useResume();
  const [showPreview, setShowPreview] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const previewRef = useRef(null);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      console.log('Starting DOCX download...');
      
      // Generate filename
      const filename = resumeData.personalInfo?.fullName 
        ? resumeData.personalInfo.fullName.replace(/\s+/g, '_') 
        : 'resume';
      
      // Download the DOCX file with the selected template
      await downloadDOCX(resumeData, filename, selectedTemplate);
      
      console.log('✅ DOCX downloaded successfully');
      
      // Try to save to backend (optional, don't fail if backend is down)
      try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const saveResponse = await saveResumeSession(resumeData, sessionId);
        console.log('✅ Resume saved to MongoDB:', saveResponse);
      } catch (backendError) {
        console.warn('⚠️ Could not save to backend (backend may be offline):', backendError.message);
      }
      
      // Show success message
      if (window.toast) {
        window.toast({
          title: "Download Successful",
          description: "Resume downloaded successfully as DOCX!",
        });
      }
      
    } catch (error) {
      console.error('❌ Error downloading DOCX:', error);
      console.error('Error details:', error.message, error.stack);
      if (window.toast) {
        window.toast({
          title: "Download Failed",
          description: error.message || "Failed to download DOCX. Please try again.",
        });
      }
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadPDF = async () => {
    setIsDownloadingPDF(true);
    
    // If preview is hidden, show it temporarily
    const wasHidden = !showPreview;
    if (wasHidden) {
      setShowPreview(true);
      // Wait for preview to render
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    
    try {
      console.log('Starting PDF download...');
      
      // Dynamically import the libraries
      const html2canvas = (await import('html2canvas')).default;
      const { jsPDF } = await import('jspdf');
      
      console.log('Libraries imported successfully');
      
      // Target ONLY the resume content, not the UI elements
      const resumeContentElement = document.getElementById('resume-content-for-pdf');
      
      if (!resumeContentElement) {
        console.error('Resume content element not found. Looking for #resume-content-for-pdf');
        throw new Error('Resume content not found. Please make sure the preview is visible.');
      }

      console.log('Resume content element found:', resumeContentElement);

      // Generate canvas from ONLY the resume content (no UI elements)
      const canvas = await html2canvas(resumeContentElement, {
        scale: 2.5, // Higher quality
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        allowTaint: false,
        imageTimeout: 0,
        removeContainer: true,
        // Ignore elements with specific classes if needed
        ignoreElements: (element) => {
          // Skip any remaining UI elements that might be inside
          return element.classList.contains('preview-header') || 
                 element.classList.contains('preview-footer') ||
                 element.classList.contains('template-badge') ||
                 element.classList.contains('preview-controls');
        }
      });

      console.log('Canvas generated:', canvas.width, 'x', canvas.height);

      if (canvas.width === 0 || canvas.height === 0) {
        throw new Error('Generated canvas is empty. Please try again.');
      }

      // Calculate dimensions for A4 size
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      });

      // Convert canvas to image data
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      // If content fits in one page, add it directly
      if (imgHeight <= pageHeight) {
        // Content fits in one page - center it
        const yOffset = (pageHeight - imgHeight) / 2;
        pdf.addImage(imgData, 'JPEG', 0, yOffset > 0 ? yOffset : 0, imgWidth, imgHeight, undefined, 'FAST');
      } else {
        // Content is longer than one page - split across multiple pages
        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        // Add additional pages if needed
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }
      }

      // Generate filename
      const filename = resumeData.personalInfo?.fullName 
        ? resumeData.personalInfo.fullName.replace(/\s+/g, '_') 
        : 'resume';

      // Save PDF
      pdf.save(`${filename}.pdf`);

      console.log('✅ PDF downloaded successfully');

      // Show success message
      if (window.toast) {
        window.toast({
          title: "PDF Downloaded",
          description: "Resume downloaded successfully as PDF!",
        });
      }
      
    } catch (error) {
      console.error('❌ Error downloading PDF:', error);
      console.error('Error details:', error.message, error.stack);
      if (window.toast) {
        window.toast({
          title: "Download Failed",
          description: error.message || "Failed to download PDF. Please try again.",
        });
      }
    } finally {
      // Restore preview state if it was hidden
      if (wasHidden) {
        setShowPreview(false);
      }
      setIsDownloadingPDF(false);
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
              onClick={handleDownloadPDF}
              disabled={isDownloadingPDF}
              variant="outline"
              className="download-pdf-btn"
            >
              <FileText className="btn-icon" />
              {isDownloadingPDF ? 'Generating...' : 'Download PDF'}
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