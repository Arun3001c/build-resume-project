// src/pages/LandingPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { FileText, Download, Eye, Sparkles } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

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
            {/* <Button 
              variant="outline"
              size="lg"
              className="secondary-btn"
            >
              View Templates
            </Button> */}
          </div>
        </div>
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