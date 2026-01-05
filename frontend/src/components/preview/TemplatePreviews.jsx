// src/components/preview/TemplatePreviews.jsx
import React from 'react';
import './TemplatePreviews.css';

// Modern Template Preview
export const ModernPreview = () => {
  return (
    <div className="template-preview template-preview-modern">
      <div className="preview-content">
        <div className="preview-header">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-contact">
            <span>john@email.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title">SUMMARY</div>
          <div className="preview-text-line"></div>
          <div className="preview-text-line short"></div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title">EXPERIENCE</div>
          <div className="preview-item">
            <div className="preview-item-title">Senior Developer</div>
            <div className="preview-item-subtitle">Tech Company • 2020-Present</div>
            <div className="preview-text-line"></div>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title">SKILLS</div>
          <div className="preview-tags">
            <span className="preview-tag">React</span>
            <span className="preview-tag">Node.js</span>
            <span className="preview-tag">TypeScript</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Classic Template Preview
export const ClassicPreview = () => {
  return (
    <div className="template-preview template-preview-classic">
      <div className="preview-content">
        <div className="preview-header classic">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-contact">
            <span>john@email.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title">PROFESSIONAL SUMMARY</div>
          <div className="preview-text-line"></div>
          <div className="preview-text-line short"></div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title">WORK EXPERIENCE</div>
          <div className="preview-item">
            <div className="preview-item-title">Senior Software Engineer</div>
            <div className="preview-item-subtitle">Technology Solutions Inc. • 2019-Present</div>
            <div className="preview-text-line"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Minimal Template Preview
export const MinimalPreview = () => {
  return (
    <div className="template-preview template-preview-minimal">
      <div className="preview-content">
        <div className="preview-header minimal">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-divider"></div>
          <div className="preview-contact">
            <span>john@email.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="preview-section">
          <div className="preview-text-line long"></div>
          <div className="preview-text-line"></div>
        </div>
        
        <div className="preview-section">
          <div className="preview-section-title minimal">EXPERIENCE</div>
          <div className="preview-item">
            <div className="preview-item-title">Lead Developer</div>
            <div className="preview-item-subtitle">Startup Co. • 2021-Present</div>
            <div className="preview-text-line short"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Executive Template Preview
export const ExecutivePreview = () => {
  return (
    <div className="template-preview template-preview-executive">
      <div className="preview-content executive">
        <div className="preview-header executive">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-title">Senior Executive</div>
          <div className="preview-contact">
            <span>john@email.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="preview-grid">
          <div className="preview-main">
            <div className="preview-section">
              <div className="preview-section-title">PROFILE</div>
              <div className="preview-text-line"></div>
            </div>
            <div className="preview-section">
              <div className="preview-section-title">EXPERIENCE</div>
              <div className="preview-item">
                <div className="preview-item-title">VP of Engineering</div>
                <div className="preview-text-line short"></div>
              </div>
            </div>
          </div>
          <div className="preview-sidebar">
            <div className="preview-section">
              <div className="preview-section-title">CONTACT</div>
              <div className="preview-text-line"></div>
            </div>
            <div className="preview-section">
              <div className="preview-section-title">EDUCATION</div>
              <div className="preview-text-line short"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Creative Template Preview
export const CreativePreview = () => {
  return (
    <div className="template-preview template-preview-creative">
      <div className="preview-content creative">
        <div className="preview-header creative">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-accent"></div>
          <div className="preview-contact">
            <span>john@email.com</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
        
        <div className="preview-section creative">
          <div className="preview-section-title creative">
            <span className="preview-dot"></span>
            ABOUT
          </div>
          <div className="preview-text-line"></div>
        </div>
        
        <div className="preview-section creative">
          <div className="preview-section-title creative">
            <span className="preview-dot"></span>
            PROJECTS
          </div>
          <div className="preview-card">
            <div className="preview-item-title">E-Commerce Platform</div>
            <div className="preview-text-line short"></div>
          </div>
        </div>
        
        <div className="preview-section creative">
          <div className="preview-section-title creative">
            <span className="preview-dot"></span>
            SKILLS
          </div>
          <div className="preview-tags">
            <span className="preview-tag dark">React</span>
            <span className="preview-tag dark">Node.js</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Technical Template Preview
export const TechnicalPreview = () => {
  return (
    <div className="template-preview template-preview-technical">
      <div className="preview-content technical">
        <div className="preview-header technical">
          <div className="preview-name">JOHN DOE</div>
          <div className="preview-contact-grid">
            <div>john@email.com</div>
            <div>+1 (555) 123-4567</div>
          </div>
        </div>
        
        <div className="preview-section technical">
          <div className="preview-section-header">// SUMMARY</div>
          <div className="preview-text-line"></div>
        </div>
        
        <div className="preview-section technical">
          <div className="preview-section-header">// TECHNICAL SKILLS</div>
          <div className="preview-grid technical">
            <div className="preview-box">JavaScript</div>
            <div className="preview-box">TypeScript</div>
            <div className="preview-box">React</div>
            <div className="preview-box">Node.js</div>
          </div>
        </div>
        
        <div className="preview-section technical">
          <div className="preview-section-header">// EXPERIENCE</div>
          <div className="preview-item">
            <div className="preview-item-title">Senior Full Stack Developer</div>
            <div className="preview-text-line short"></div>
          </div>
        </div>
      </div>
    </div>
  );
};