// src/components/preview/templates/ExecutiveTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import './ExecutiveTemplate.css';

const ExecutiveTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  useEffect(() => {
    console.log('ExecutiveTemplate rendered');
  }, [personalInfo]);

  return (
    <div className="executive-template">
      {/* Header with Gray Background */}
      <div className="template-header executive-header">
        <div className="header-content executive-header-content">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="profile-photo executive-photo"
            />
          )}
          <div className="header-info">
            <h1 className="full-name executive-name">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="contact-grid executive-contact">
              <div className="contact-item">
                <span className="contact-label">Email:</span>
                <span>{personalInfo.email || 'email@example.com'}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
              </div>
              <div className="contact-item">
                <span className="contact-label">Location:</span>
                <span>{personalInfo.location || 'City, Country'}</span>
              </div>
              {personalInfo.linkedin && (
                <div className="contact-item">
                  <span className="contact-label">LinkedIn:</span>
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="contact-item">
                  <span className="contact-label">Website:</span>
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="template-content executive-content">
        {/* Main Column */}
        <div className="main-column">
          {/* Summary */}
          {summary && (
            <div className="template-section executive-section">
              <h2 className="section-title executive-title">Executive Profile</h2>
              <p className="section-content executive-summary">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {workExperience.length > 0 && workExperience[0].position && (
            <div className="template-section executive-section">
              <h2 className="section-title executive-title">Professional Experience</h2>
              {workExperience.map((exp) => exp.position && (
                <div key={exp.id} className="experience-item executive-item">
                  <div className="experience-header executive-header-item">
                    <h3 className="experience-position executive-position">{exp.position}</h3>
                    <span className="experience-date executive-date">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <div className="experience-subheader executive-subheader">
                    <span className="experience-company executive-company">{exp.company}</span>
                    {exp.location && <span className="experience-location executive-location"> | {exp.location}</span>}
                  </div>
                  <p className="experience-description executive-description">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && projects[0].name && (
            <div className="template-section executive-section">
              <h2 className="section-title executive-title">Key Projects</h2>
              {projects.map((proj) => proj.name && (
                <div key={proj.id} className="project-item executive-item">
                  <h3 className="project-name executive-project-name">{proj.name}</h3>
                  {proj.technologies && (
                    <p className="project-technologies executive-technologies">{proj.technologies}</p>
                  )}
                  <p className="project-description executive-description">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Column */}
        <div className="sidebar-column">
          {/* Education */}
          {education.length > 0 && education[0].degree && (
            <div className="template-section executive-section sidebar-section">
              <h2 className="section-title executive-title sidebar-title">Education</h2>
              {education.map((edu) => edu.degree && (
                <div key={edu.id} className="education-item executive-item sidebar-item">
                  <h3 className="education-degree executive-degree">{edu.degree}</h3>
                  <p className="education-institution executive-institution">{edu.institution}</p>
                  <p className="education-date executive-date">{formatDate(edu.graduationDate)}</p>
                  {edu.gpa && <p className="education-gpa executive-gpa">GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <div className="template-section executive-section sidebar-section">
              <h2 className="section-title executive-title sidebar-title">Core Competencies</h2>
              <ul className="skills-list executive-skills">
                {skills.map((skill, index) => (
                  <li key={index} className="skill-item executive-skill">{skill}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && certifications[0].name && (
            <div className="template-section executive-section sidebar-section">
              <h2 className="section-title executive-title sidebar-title">Certifications</h2>
              {certifications.map((cert) => cert.name && (
                <div key={cert.id} className="certification-item executive-item sidebar-item">
                  <p className="certification-name executive-cert-name">{cert.name}</p>
                  <p className="certification-issuer executive-issuer">{cert.issuer}</p>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && languages[0].name && (
            <div className="template-section executive-section sidebar-section">
              <h2 className="section-title executive-title sidebar-title">Languages</h2>
              {languages.map((lang) => lang.name && (
                <div key={lang.id} className="language-item executive-item sidebar-item">
                  <span className="language-name executive-language">{lang.name}</span>
                  {lang.proficiency && <span className="language-proficiency executive-proficiency"> – {lang.proficiency}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Achievements */}
          {achievements && (
            <div className="template-section executive-section sidebar-section">
              <h2 className="section-title executive-title sidebar-title">Achievements</h2>
              <p className="achievements-text executive-content sidebar-content">{achievements}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExecutiveTemplate;