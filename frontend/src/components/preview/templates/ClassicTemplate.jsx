// src/components/preview/templates/ClassicTemplate.jsx
import React, { useEffect } from 'react';
import { useResume } from '../../../context/ResumeContext';
import { formatDate } from '../../../utils/helpers';
import './ClassicTemplate.css';

const ClassicTemplate = () => {
  const { resumeData } = useResume();
  const { personalInfo, summary, workExperience, education, skills, projects, certifications, languages, achievements, interests } = resumeData;

  // Debug: Track re-renders
  useEffect(() => {
    console.log('ClassicTemplate rendered/updated with data:', {
      name: personalInfo?.fullName,
      skills: skills?.length
    });
  }, [personalInfo, skills]);

  return (
    <div className="classic-template">
      {/* Header - Centered */}
      <div className="template-header classic-header">
        <h1 className="full-name classic-name">{personalInfo.fullName || 'Your Name'}</h1>
        <div className="contact-info classic-contact">
          <span>{personalInfo.email || 'email@example.com'}</span>
          <span className="separator">|</span>
          <span>{personalInfo.phone || '+1 (555) 123-4567'}</span>
          <span className="separator">|</span>
          <span>{personalInfo.location || 'City, Country'}</span>
          {personalInfo.linkedin && (
            <>
              <span className="separator">|</span>
              <span>{personalInfo.linkedin}</span>
            </>
          )}
          {personalInfo.website && (
            <>
              <span className="separator">|</span>
              <span>{personalInfo.website}</span>
            </>
          )}
        </div>
        <div className="header-divider"></div>
      </div>

      {/* Summary */}
      {summary && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Professional Summary</h2>
          <p className="section-content classic-summary">{summary}</p>
        </div>
      )}

      {/* Work Experience */}
      {workExperience.length > 0 && workExperience[0].position && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Professional Experience</h2>
          {workExperience.map((exp) => exp.position && (
            <div key={exp.id} className="experience-item classic-item">
              <div className="experience-header classic-header-item">
                <h3 className="experience-position classic-position">{exp.position}</h3>
                <span className="experience-date classic-date">
                  {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                </span>
              </div>
              <div className="experience-subheader classic-subheader">
                <span className="experience-company classic-company">{exp.company}</span>
                {exp.location && <span className="experience-location classic-location"> • {exp.location}</span>}
              </div>
              <p className="experience-description classic-description">{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {education.length > 0 && education[0].degree && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Education</h2>
          {education.map((edu) => edu.degree && (
            <div key={edu.id} className="education-item classic-item">
              <div className="education-header classic-header-item">
                <h3 className="education-degree classic-degree">{edu.degree}</h3>
                <span className="education-date classic-date">{formatDate(edu.graduationDate)}</span>
              </div>
              <div className="education-subheader classic-subheader">
                <span className="education-institution classic-institution">{edu.institution}</span>
                {edu.location && <span className="education-location classic-location"> • {edu.location}</span>}
                {edu.gpa && <span className="education-gpa classic-gpa"> • GPA: {edu.gpa}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && projects[0].name && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Projects</h2>
          {projects.map((proj) => proj.name && (
            <div key={proj.id} className="project-item classic-item">
              <h3 className="project-name classic-project-name">{proj.name}</h3>
              {proj.technologies && (
                <p className="project-technologies classic-technologies">{proj.technologies}</p>
              )}
              <p className="project-description classic-description">{proj.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Skills</h2>
          <div className="skills-container classic-skills">
            {skills.map((skill, index) => (
              <React.Fragment key={index}>
                <span className="skill-item classic-skill">{skill}</span>
                {index < skills.length - 1 && <span className="skill-separator"> • </span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Certifications */}
      {certifications.length > 0 && certifications[0].name && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Certifications</h2>
          {certifications.map((cert) => cert.name && (
            <div key={cert.id} className="certification-item classic-item">
              <span className="certification-name classic-cert-name">{cert.name}</span>
              <span className="certification-details classic-cert-details"> – {cert.issuer}, {formatDate(cert.date)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && languages[0].name && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Languages</h2>
          <div className="languages-container classic-languages">
            {languages.map((lang, index) => lang.name && (
              <React.Fragment key={lang.id}>
                <span className="language-item classic-language">
                  {lang.name}{lang.proficiency && ` (${lang.proficiency})`}
                </span>
                {index < languages.length - 1 && <span className="language-separator"> • </span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Achievements</h2>
          <p className="section-content classic-content">{achievements}</p>
        </div>
      )}

      {/* Interests */}
      {interests && (
        <div className="template-section classic-section">
          <h2 className="section-title classic-title">Interests</h2>
          <p className="section-content classic-content">{interests}</p>
        </div>
      )}
    </div>
  );
};

export default ClassicTemplate;