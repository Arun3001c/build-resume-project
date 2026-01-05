// src/components/preview/templates/MinimalTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import './MinimalTemplate.css';

const MinimalTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  useEffect(() => {
    console.log('MinimalTemplate rendered');
  }, [personalInfo]);

  return (
    <div className="minimal-template">
      {/* Header - Minimal */}
      <div className="template-header minimal-header">
        <h1 className="full-name minimal-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="header-divider minimal-divider"></div>
        <div className="contact-info minimal-contact">
          <span>{personalInfo.email || 'email@example.com'}</span>
          <span>•</span>
          <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
          <span>•</span>
          <span>{personalInfo.location || 'City, Country'}</span>
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span>•</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="template-section minimal-section">
          <p className="summary-text minimal-summary">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && workExperience[0].position && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Experience</h2>
          {workExperience.map((exp) => exp.position && (
            <div key={exp.id} className="experience-item minimal-item">
              <div className="experience-header minimal-header-item">
                <h3 className="experience-position minimal-position">{exp.position} at {exp.company}</h3>
                <span className="experience-date minimal-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <p className="experience-description minimal-description">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].name && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Projects</h2>
          {projects.map((proj) => proj.name && (
            <div key={proj.id} className="project-item minimal-item">
              <h3 className="project-name minimal-project-name">{proj.name}</h3>
              {proj.technologies && (
                <p className="project-technologies minimal-technologies">{proj.technologies}</p>
              )}
              <p className="project-description minimal-description">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].degree && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Education</h2>
          {education.map((edu) => edu.degree && (
            <div key={edu.id} className="education-item minimal-item">
              <div className="education-header minimal-header-item">
                <div>
                  <h3 className="education-degree minimal-degree">{edu.degree}</h3>
                  <p className="education-institution minimal-institution">{edu.institution}</p>
                </div>
                <span className="education-date minimal-date">{formatDate(edu.graduationDate)}</span>
              </div>
              {edu.gpa && <p className="education-gpa minimal-gpa">GPA: {edu.gpa}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Skills</h2>
          <p className="skills-text minimal-skills">{skills.join(', ')}</p>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Certifications</h2>
          {certifications.map((cert) => cert.name && (
            <div key={cert.id} className="certification-item minimal-item">
              <span className="certification-name minimal-cert-name">{cert.name}</span>
              <span className="certification-details minimal-cert-details"> — {cert.issuer}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && languages[0].name && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Languages</h2>
          <p className="languages-text minimal-languages">
            {languages.map((lang, index) => lang.name && (
              <span key={lang.id}>
                {lang.name}{lang.proficiency && ` (${lang.proficiency})`}
                {index < languages.length - 1 && ', '}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Achievements</h2>
          <p className="achievements-text minimal-content">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="template-section minimal-section">
          <h2 className="section-title minimal-title">Interests</h2>
          <p className="interests-text minimal-content">{interests}</p>
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;