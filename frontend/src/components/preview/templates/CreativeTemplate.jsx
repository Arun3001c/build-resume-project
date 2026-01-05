// src/components/preview/templates/CreativeTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import './CreativeTemplate.css';

const CreativeTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  useEffect(() => {
    console.log('CreativeTemplate rendered');
  }, [personalInfo]);

  return (
    <div className="creative-template">
      {/* Header with Accent */}
      <div className="template-header creative-header">
        <div className="header-content creative-header-content">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="profile-photo creative-photo"
            />
          )}
          <div className="header-info">
            <h1 className="full-name creative-name">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="accent-bar creative-accent"></div>
            <div className="contact-info creative-contact">
              <span>{personalInfo.email || 'email@example.com'}</span>
              <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
              <span>{personalInfo.location || 'City, Country'}</span>
              {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
              {personalInfo.website && <span>{personalInfo.website}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Summary with Background */}
      {summary && (
        <div className="template-section creative-section highlight-section">
          <h2 className="section-title creative-title">About Me</h2>
          <p className="section-content creative-summary">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && workExperience[0].position && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title with-dot">Experience</h2>
          {workExperience.map((exp) => exp.position && (
            <div key={exp.id} className="experience-item creative-item">
              <h3 className="experience-position creative-position">{exp.position}</h3>
              <div className="experience-subheader creative-subheader">
                <span className="experience-company creative-company">{exp.company}</span>
                <span className="experience-separator">|</span>
                <span className="experience-date creative-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="experience-description creative-description">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].name && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title with-dot">Featured Projects</h2>
          <div className="projects-grid">
            {projects.map((proj) => proj.name && (
              <div key={proj.id} className="project-card creative-card">
                <h3 className="project-name creative-project-name">{proj.name}</h3>
                {proj.technologies && (
                  <p className="project-technologies creative-technologies">{proj.technologies}</p>
                )}
                <p className="project-description creative-description">{proj.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Two Column for Education and Skills */}
      <div className="two-column creative-two-column">
        {/* Education */}
        {education.length > 0 && education[0].degree && (
          <div className="column">
            <div className="template-section creative-section">
              <h2 className="section-title creative-title with-dot">Education</h2>
              {education.map((edu) => edu.degree && (
                <div key={edu.id} className="education-item creative-item">
                  <h3 className="education-degree creative-degree">{edu.degree}</h3>
                  <p className="education-institution creative-institution">{edu.institution}</p>
                  <p className="education-date creative-date">{formatDate(edu.graduationDate)}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="column">
            <div className="template-section creative-section">
              <h2 className="section-title creative-title with-dot">Skills</h2>
              <div className="skills-container creative-skills">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-tag creative-skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Certifications and Languages */}
      <div className="two-column creative-two-column">
        {/* Certifications */}
        {certifications.length > 0 && certifications[0].name && (
          <div className="column">
            <div className="template-section creative-section">
              <h2 className="section-title creative-title with-dot">Certifications</h2>
              {certifications.map((cert) => cert.name && (
                <div key={cert.id} className="certification-item creative-item">
                  <h3 className="certification-name creative-cert-name">{cert.name}</h3>
                  <p className="certification-issuer creative-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && languages[0].name && (
          <div className="column">
            <div className="template-section creative-section">
              <h2 className="section-title creative-title with-dot">Languages</h2>
              {languages.map((lang) => lang.name && (
                <div key={lang.id} className="language-item creative-item">
                  <span className="language-name creative-language">{lang.name}</span>
                  {lang.proficiency && <span className="language-proficiency creative-proficiency"> - {lang.proficiency}</span>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Achievements */}
      {achievements && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title with-dot">Achievements</h2>
          <p className="achievements-text creative-content">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="template-section creative-section">
          <h2 className="section-title creative-title with-dot">Interests</h2>
          <p className="interests-text creative-content">{interests}</p>
        </div>
      )}
    </div>
  );
};

export default CreativeTemplate;