// src/components/preview/templates/TechnicalTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import './TechnicalTemplate.css';

const TechnicalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  useEffect(() => {
    console.log('TechnicalTemplate rendered');
  }, [personalInfo]);

  return (
    <div className="technical-template">
      {/* Header with Border */}
      <div className="template-header technical-header">
        <h1 className="full-name technical-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-grid technical-contact">
          <div className="grid-item">
            <span className="contact-label">Email:</span>
            <span>{personalInfo.email || 'email@example.com'}</span>
          </div>
          <div className="grid-item">
            <span className="contact-label">Phone:</span>
            <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
          </div>
          <div className="grid-item">
            <span className="contact-label">Location:</span>
            <span>{personalInfo.location || 'City, Country'}</span>
          </div>
          {personalInfo.linkedin && (
            <div className="grid-item">
              <span className="contact-label">LinkedIn:</span>
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
          {personalInfo.website && (
            <div className="grid-item">
              <span className="contact-label">Web:</span>
              <span>{personalInfo.website}</span>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// SUMMARY</h2>
          <p className="section-content technical-summary">{summary}</p>
        </div>
      )}

      {/* Technical Skills - Prioritized */}
      {skills.length > 0 && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// TECHNICAL SKILLS</h2>
          <div className="skills-grid technical-grid">
            {skills.slice(0, 8).map((skill, index) => (
              <div key={index} className="skill-box technical-box">{skill}</div>
            ))}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && workExperience[0].position && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// EXPERIENCE</h2>
          {workExperience.map((exp) => exp.position && (
            <div key={exp.id} className="experience-item technical-item">
              <div className="experience-header technical-header-item">
                <h3 className="experience-position technical-position">{exp.position}</h3>
                <span className="experience-date technical-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="experience-subheader technical-subheader">
                <span className="experience-company technical-company">{exp.company}</span>
                {exp.location && <span className="experience-location technical-location"> | {exp.location}</span>}
              </div>
              <p className="experience-description technical-description">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects - Important for technical roles */}
      {projects.length > 0 && projects[0].name && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// PROJECTS</h2>
          {projects.map((proj) => proj.name && (
            <div key={proj.id} className="project-item technical-item">
              <h3 className="project-name technical-project-name">{proj.name}</h3>
              {proj.technologies && (
                <p className="project-technologies technical-technologies">
                  <span className="tech-label">Tech Stack:</span> {proj.technologies}
                </p>
              )}
              <p className="project-description technical-description">{proj.description}</p>
              {proj.link && (
                <p className="project-link technical-link">
                  <span className="link-label">Link:</span> {proj.link}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].degree && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// EDUCATION</h2>
          {education.map((edu) => edu.degree && (
            <div key={edu.id} className="education-item technical-item">
              <div className="education-header technical-header-item">
                <h3 className="education-degree technical-degree">{edu.degree}</h3>
                <span className="education-date technical-date">{formatDate(edu.graduationDate)}</span>
              </div>
              <p className="education-institution technical-institution">{edu.institution}</p>
              {edu.gpa && <p className="education-gpa technical-gpa">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// CERTIFICATIONS</h2>
          {certifications.map((cert) => cert.name && (
            <div key={cert.id} className="certification-item technical-item">
              <div className="certification-header">
                <span className="certification-name technical-cert-name">{cert.name}</span>
                <span className="certification-date technical-date">{formatDate(cert.date)}</span>
              </div>
              <p className="certification-issuer technical-issuer">{cert.issuer}</p>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && languages[0].name && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// LANGUAGES</h2>
          <p className="languages-text technical-languages">
            {languages.map((lang, index) => lang.name && (
              <span key={lang.id}>
                {lang.name}{lang.proficiency && ` (${lang.proficiency})`}
                {index < languages.length - 1 && ' | '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// ACHIEVEMENTS</h2>
          <p className="achievements-text technical-content">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="template-section technical-section">
          <h2 className="section-title technical-title">// INTERESTS</h2>
          <p className="interests-text technical-content">{interests}</p>
        </div>
      )}
    </div>
  );
};

export default TechnicalTemplate;