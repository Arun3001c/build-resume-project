// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FileText, Download, Eye, Sparkles } from 'lucide-react';
import resumeImage from '../assets/resume.png';
import './LandingPage.css';

const WelcomeScreen = ({ onContinue }) => {
  return (
    <div className="welcome-screen">
      <div className="welcome-content">
        <div className="welcome-text-section">
          <h2 className="welcome-title">
            Just Follow these <br />simple steps <br />
          </h2>

          <div className="welcome-steps">
            <p className="welcome-step">
              1. <strong>Select a template</strong> from our library of professional designs
            </p>
            <p className="welcome-step">
              2. <strong>Build your resume</strong> with our industry-specific bullet points
            </p>
            <p className="welcome-step">
              3. <strong>Customize the details</strong> and wrap it up. You're ready to send!
            </p>
          </div>
        </div>

        <div className="welcome-image-section">
          <div className="welcome-image-container">
            <img
              src={resumeImage}
              alt="Resume templates"
              className="welcome-resume-image"
            />
          </div>
        </div>
      </div>

      <div className="welcome-button-container">
        <Button
          onClick={onContinue}
          className="welcome-next-button"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);

  const handleContinue = () => {
    setShowWelcome(false);
    navigate('/templates');
  };

  return (
    <div className="landing-page">
      {/* Header */}
      {/* <header className="landing-header">
        <div className="container header-container">
          <div className="logo">
            <FileText className="logo-icon" />
            <span className="logo-text">ResumeBuilder</span>
          </div>
          <Button 
            onClick={() => navigate('/templates')}
            className="get-started-btn"
          >
            Get Started
          </Button>
        </div>
      </header> */}

      {/* Hero Section */}
      <section className="hero-section">
        {showWelcome ? (
          <WelcomeScreen onContinue={handleContinue} />
        ) : (
          <div className="container hero-container">
            <div className="badge">
              <Sparkles className="badge-icon" />
              Professional Resume Builder
            </div>
            
            <h1 className="hero-title">
              Create Your Perfect Resume in
              <span className="hero-highlight"> Minutes</span>
            </h1>
            
            <p className="hero-description">
              Build ATS-friendly resumes with our intuitive editor. Choose from professional templates,
              edit in real-time, and download as DOCX - all without page refresh.
            </p>
            
            <div className="hero-buttons">
              <Button 
                onClick={() => navigate('/templates')}
                size="lg"
                className="primary-btn"
              >
                Start Building
              </Button>
            </div>
          </div>
        )}
      </section>

      {/* Features Section */}
      {/* <section className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <FileText className="icon" />
              </div>
              <h3 className="feature-title">Multiple Templates</h3>
              <p className="feature-description">
                Choose from 6 professionally designed templates. Each optimized for ATS systems and modern hiring standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Eye className="icon" />
              </div>
              <h3 className="feature-title">Live Preview</h3>
              <p className="feature-description">
                See your changes in real-time as you type. No need to refresh or wait - instant visual feedback.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <Download className="icon" />
              </div>
              <h3 className="feature-title">Export to DOCX</h3>
              <p className="feature-description">
                Download your resume as a Word document with one click. Professional formatting preserved.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      {/* <section className="cta-section">
        <div className="container cta-container">
          <h2 className="cta-title">Ready to Build Your Resume?</h2>
          <p className="cta-description">
            Join thousands of professionals who landed their dream jobs
          </p>
          <Button 
            onClick={() => navigate('/templates')}
            size="lg"
            className="cta-button"
          >
            Get Started Now
          </Button>
        </div>
      </section> */}

      {/* Footer */}
      {/* <footer className="footer">
        <div className="container">
          <p className="footer-text">&copy; 2025 ResumeBuilder. All rights reserved.</p>
        </div>
      </footer> */}
    </div>
  );
};

export default LandingPage;