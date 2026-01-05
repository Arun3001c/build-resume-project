// src/components/preview/templates/ModernTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';
import './ModernTemplate.css';

const ModernTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  // Debug: Track re-renders
  useEffect(() => {
    console.log('ModernTemplate rendered/updated with data:', {
      name: personalInfo?.fullName,
      skills: skills?.length,
      experience: workExperience?.length
    });
  }, [personalInfo, skills, workExperience]);

  return (
    <div className="modern-template">
      {/* Header */}
      <div className="template-header">
        <div className="header-content">
          {personalInfo.profilePhoto && (
            <img 
              src={personalInfo.profilePhoto} 
              alt="Profile" 
              className="profile-photo"
            />
          )}
          <div>
            <h1 className="full-name">{personalInfo.fullName || 'Your Name'}</h1>
            <div className="contact-info">
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>{personalInfo.email || 'email@example.com'}</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>{personalInfo.location || 'City, Country'}</span>
              </div>
              {personalInfo.linkedin && (
                <div className="contact-item">
                  <Linkedin className="contact-icon" />
                  <span>{personalInfo.linkedin}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="contact-item">
                  <Globe className="contact-icon" />
                  <span>{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="template-section">
          <h2 className="section-title">Professional Summary</h2>
          <p className="section-content summary">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && workExperience[0].position && (
        <div className="template-section">
          <h2 className="section-title">Work Experience</h2>
          {workExperience.map((exp) => exp.position && (
            <div key={exp.id} className="experience-item">
              <div className="experience-header">
                <h3 className="experience-position">{exp.position}</h3>
                <span className="experience-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="experience-subheader">
                <span className="experience-company">{exp.company}</span>
                {exp.location && <span className="experience-location"> | {exp.location}</span>}
              </div>
              <p className="experience-description">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].degree && (
        <div className="template-section">
          <h2 className="section-title">Education</h2>
          {education.map((edu) => edu.degree && (
            <div key={edu.id} className="education-item">
              <div className="education-header">
                <h3 className="education-degree">{edu.degree}</h3>
                <span className="education-date">{formatDate(edu.graduationDate)}</span>
              </div>
              <div className="education-subheader">
                <span className="education-institution">{edu.institution}</span>
                {edu.location && <span className="education-location"> | {edu.location}</span>}
                {edu.gpa && <span className="education-gpa"> | GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="template-section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-container">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].name && (
        <div className="template-section">
          <h2 className="section-title">Projects</h2>
          {projects.map((proj) => proj.name && (
            <div key={proj.id} className="project-item">
              <h3 className="project-name">{proj.name}</h3>
              {proj.technologies && (
                <p className="project-technologies">{proj.technologies}</p>
              )}
              <p className="project-description">{proj.description}</p>
              {proj.link && (
                <p className="project-link">{proj.link}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="template-section">
          <h2 className="section-title">Certifications</h2>
          {certifications.map((cert) => cert.name && (
            <div key={cert.id} className="certification-item">
              <span className="certification-name">{cert.name}</span>
              <span className="certification-details"> - {cert.issuer}, {formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && languages[0].name && (
        <div className="template-section">
          <h2 className="section-title">Languages</h2>
          <div className="languages-container">
            {languages.map((lang) => lang.name && (
              <div key={lang.id} className="language-item">
                <span className="language-name">{lang.name}</span>
                {lang.proficiency && <span className="language-proficiency"> ({lang.proficiency})</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div className="template-section">
          <h2 className="section-title">Achievements</h2>
          <p className="section-content">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="template-section">
          <h2 className="section-title">Interests</h2>
          <p className="section-content">{interests}</p>
        </div>
      )}
    </div>
  );
};

export default ModernTemplate;