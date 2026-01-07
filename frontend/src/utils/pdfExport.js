// src/utils/pdfExport.js
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle, Table, TableRow, TableCell, WidthType, ShadingType } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Export resume as DOCX
 * @param {Object} resumeData - The resume data
 * @param {string} template - The selected template name (default: 'modern')
 * @returns {Promise<Blob>} - DOCX blob
 */

// Helper function to create styled section headers with background color
const createSectionHeader = (text, template = 'modern') => {
  // Template-specific colors
  const colors = {
    modern: { bg: '2563eb', text: 'FFFFFF' }, // Blue background
    classic: { bg: '1e293b', text: 'FFFFFF' }, // Dark slate background
    minimal: { bg: 'F3F4F6', text: '1F2937' }, // Light gray background
    executive: { bg: '1e293b', text: 'FFFFFF' }, // Dark slate background
    creative: { bg: '7c3aed', text: 'FFFFFF' }, // Purple background
    technical: { bg: '0f172a', text: 'FFFFFF' }, // Very dark background
  };

  const color = colors[template] || colors.modern;

  return new Paragraph({
    children: [
      new TextRun({
        text: text,
        bold: true,
        size: 24,
        color: color.text,
        allCaps: true,
      }),
    ],
    spacing: { before: 300, after: 150 },
    shading: {
      type: ShadingType.SOLID,
      color: color.bg,
      fill: color.bg,
    },
    indent: { left: 150, right: 150 },
    border: {
      top: { style: BorderStyle.SINGLE, size: 1, color: color.bg },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: color.bg },
      left: { style: BorderStyle.SINGLE, size: 1, color: color.bg },
      right: { style: BorderStyle.SINGLE, size: 1, color: color.bg },
    },
  });
};

// Template configuration mapping
const templateConfig = {
  modern: {
    headerAlignment: AlignmentType.LEFT,
    contactSeparator: ' | ',
    contactFormat: 'inline', // inline, labeled, grid
    summaryTitle: 'PROFESSIONAL SUMMARY',
    experienceTitle: 'WORK EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'SKILLS',
    skillsSeparator: ' • ',
    projectsTitle: 'PROJECTS',
    certificationsTitle: 'CERTIFICATIONS',
    languagesTitle: 'LANGUAGES',
    achievementsTitle: 'ACHIEVEMENTS',
    interestsTitle: 'INTERESTS',
  },
  classic: {
    headerAlignment: AlignmentType.CENTER,
    contactSeparator: ' | ',
    contactFormat: 'inline',
    summaryTitle: 'PROFESSIONAL SUMMARY',
    experienceTitle: 'PROFESSIONAL EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'SKILLS',
    skillsSeparator: ' • ',
    projectsTitle: 'PROJECTS',
    certificationsTitle: 'CERTIFICATIONS',
    languagesTitle: 'LANGUAGES',
    achievementsTitle: 'ACHIEVEMENTS',
    interestsTitle: 'INTERESTS',
  },
  minimal: {
    headerAlignment: AlignmentType.CENTER,
    contactSeparator: ' • ',
    contactFormat: 'inline',
    summaryTitle: '', // No title in minimal
    experienceTitle: 'EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'SKILLS',
    skillsSeparator: ', ',
    projectsTitle: 'PROJECTS',
    certificationsTitle: 'CERTIFICATIONS',
    languagesTitle: 'LANGUAGES',
    achievementsTitle: 'ACHIEVEMENTS',
    interestsTitle: 'INTERESTS',
  },
  executive: {
    headerAlignment: AlignmentType.LEFT,
    contactSeparator: ' | ',
    contactFormat: 'labeled',
    summaryTitle: 'EXECUTIVE PROFILE',
    experienceTitle: 'PROFESSIONAL EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'CORE COMPETENCIES',
    skillsSeparator: ' • ',
    projectsTitle: 'KEY PROJECTS',
    certificationsTitle: 'CERTIFICATIONS',
    languagesTitle: 'LANGUAGES',
    achievementsTitle: 'ACHIEVEMENTS',
    interestsTitle: 'INTERESTS',
  },
  technical: {
    headerAlignment: AlignmentType.LEFT,
    contactSeparator: ' | ',
    contactFormat: 'labeled',
    summaryTitle: '// SUMMARY',
    experienceTitle: '// EXPERIENCE',
    educationTitle: '// EDUCATION',
    skillsTitle: '// TECHNICAL SKILLS',
    skillsSeparator: ' • ',
    projectsTitle: '// PROJECTS',
    certificationsTitle: '// CERTIFICATIONS',
    languagesTitle: '// LANGUAGES',
    achievementsTitle: '// ACHIEVEMENTS',
    interestsTitle: '// INTERESTS',
  },
  creative: {
    headerAlignment: AlignmentType.LEFT,
    contactSeparator: ' ',
    contactFormat: 'inline',
    summaryTitle: 'ABOUT ME',
    experienceTitle: 'EXPERIENCE',
    educationTitle: 'EDUCATION',
    skillsTitle: 'SKILLS',
    skillsSeparator: ' • ',
    projectsTitle: 'FEATURED PROJECTS',
    certificationsTitle: 'CERTIFICATIONS',
    languagesTitle: 'LANGUAGES',
    achievementsTitle: 'ACHIEVEMENTS',
    interestsTitle: 'INTERESTS',
  },
};

export const exportToDOCX = async (resumeData, template = 'modern') => {
  try {
    console.log('Exporting to DOCX with template:', template, resumeData);
    
    // Get template configuration or default to modern
    const config = templateConfig[template] || templateConfig.modern;
    
    const sections = [];

    // Personal Info Section - Template-specific formatting
    const personalInfo = resumeData.personalInfo || {};
    
    sections.push(
      new Paragraph({
        text: personalInfo.fullName || 'Your Name',
        heading: HeadingLevel.HEADING_1,
        alignment: config.headerAlignment,
        spacing: {
          after: 200,
        },
      })
    );

    // Contact Information - Template-specific formatting
    if (config.contactFormat === 'labeled') {
      // Executive and Technical templates use labeled format
      const contactItems = [];
      if (personalInfo.email) contactItems.push({ label: 'Email:', value: personalInfo.email });
      if (personalInfo.phone) contactItems.push({ label: 'Phone:', value: personalInfo.phone });
      if (personalInfo.location) contactItems.push({ label: 'Location:', value: personalInfo.location });
      if (personalInfo.linkedin) contactItems.push({ label: 'LinkedIn:', value: personalInfo.linkedin });
      if (personalInfo.website) contactItems.push({ label: template === 'technical' ? 'Web:' : 'Website:', value: personalInfo.website });
      
      if (contactItems.length > 0) {
        contactItems.forEach((item, index) => {
          sections.push(
            new Paragraph({
              alignment: config.headerAlignment,
              spacing: { after: index === contactItems.length - 1 ? 200 : 50 },
              children: [
                new TextRun({
                  text: `${item.label} ${item.value}`,
                  size: 20,
                }),
              ],
            })
          );
        });
      }
    } else {
      // Inline format for other templates
      const contactLines = [];
      if (personalInfo.email) contactLines.push(personalInfo.email);
      if (personalInfo.phone) contactLines.push(personalInfo.phone);
      if (personalInfo.location) contactLines.push(personalInfo.location);
      
      if (contactLines.length > 0) {
        sections.push(
          new Paragraph({
            alignment: config.headerAlignment,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: contactLines.join(config.contactSeparator),
                size: 20,
              }),
            ],
          })
        );
      }

      // LinkedIn and Website
      const linkLines = [];
      if (personalInfo.linkedin) linkLines.push(personalInfo.linkedin);
      if (personalInfo.website) linkLines.push(personalInfo.website);
      
      if (linkLines.length > 0) {
        sections.push(
          new Paragraph({
            alignment: config.headerAlignment,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: linkLines.join(config.contactSeparator),
                size: 20,
              }),
            ],
          })
        );
      }
    }

    // Summary Section - Template-specific title with styled background
    if (resumeData.summary) {
      if (config.summaryTitle) {
        sections.push(createSectionHeader(config.summaryTitle, template));
      }
      sections.push(
        new Paragraph({
          text: resumeData.summary,
          spacing: { after: 300 },
          indent: { left: 100 },
        })
      );
    }

    // Work Experience Section - Template-specific title with styled background
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      sections.push(createSectionHeader(config.experienceTitle, template));

      resumeData.workExperience.forEach((exp, index) => {
        sections.push(
          new Paragraph({
            spacing: { before: 200, after: 50 },
            children: [
              new TextRun({
                text: exp.position || 'Position',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: `${exp.company || 'Company'}`,
                italics: true,
              }),
              new TextRun({
                text: exp.location ? ` | ${exp.location}` : '',
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: `${exp.startDate || 'Start'} - ${exp.current ? 'Present' : exp.endDate || 'End'}`,
                size: 20,
              }),
            ],
          })
        );

        if (exp.description) {
          sections.push(
            new Paragraph({
              text: exp.description,
              spacing: { after: index === resumeData.workExperience.length - 1 ? 300 : 100 },
            })
          );
        }
      });
    }

    // Education Section - Template-specific title with styled background
    if (resumeData.education && resumeData.education.length > 0) {
      sections.push(createSectionHeader(config.educationTitle, template));

      resumeData.education.forEach((edu, index) => {
        sections.push(
          new Paragraph({
            spacing: { before: 200, after: 50 },
            children: [
              new TextRun({
                text: edu.degree || 'Degree',
                bold: true,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: 50 },
            children: [
              new TextRun({
                text: `${edu.institution || 'Institution'}`,
                italics: true,
              }),
              new TextRun({
                text: edu.location ? ` | ${edu.location}` : '',
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            spacing: { after: index === resumeData.education.length - 1 ? 300 : 100 },
            children: [
              new TextRun({
                text: `Graduated: ${edu.graduationDate || 'Date'}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}`,
                size: 20,
              }),
            ],
          })
        );
      });
    }

    // Skills Section - Template-specific title and separator with styled background
    if (resumeData.skills && resumeData.skills.length > 0) {
      sections.push(createSectionHeader(config.skillsTitle, template));
      sections.push(
        new Paragraph({
          text: resumeData.skills.join(config.skillsSeparator),
          spacing: { after: 300 },
          indent: { left: 100 },
        })
      );
    }

    // Projects Section - Template-specific title with styled background
    if (resumeData.projects && resumeData.projects.length > 0) {
      sections.push(createSectionHeader(config.projectsTitle, template));

      resumeData.projects.forEach((project, index) => {
        sections.push(
          new Paragraph({
            spacing: { before: 200, after: 50 },
            children: [
              new TextRun({
                text: project.name || 'Project Name',
                bold: true,
                size: 24,
              }),
            ],
          })
        );

        if (project.description) {
          sections.push(
            new Paragraph({
              text: project.description,
              spacing: { after: 50 },
            })
          );
        }

        if (project.technologies) {
          sections.push(
            new Paragraph({
              spacing: { after: 50 },
              children: [
                new TextRun({
                  text: `Technologies: ${project.technologies}`,
                  italics: true,
                  size: 20,
                }),
              ],
            })
          );
        }

        if (project.link) {
          sections.push(
            new Paragraph({
              spacing: { after: index === resumeData.projects.length - 1 ? 300 : 100 },
              children: [
                new TextRun({
                  text: `Link: ${project.link}`,
                  size: 20,
                }),
              ],
            })
          );
        }
      });
    }

    // Certifications Section - Template-specific title with styled background
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      sections.push(createSectionHeader(config.certificationsTitle, template));

      resumeData.certifications.forEach((cert, index) => {
        sections.push(
          new Paragraph({
            spacing: { before: 100, after: 50 },
            children: [
              new TextRun({
                text: `${cert.name || 'Certification'} - ${cert.issuer || 'Issuer'}`,
                bold: true,
              }),
              new TextRun({
                text: cert.date ? ` (${cert.date})` : '',
              }),
            ],
          })
        );
      });
      sections.push(new Paragraph({ spacing: { after: 300 } }));
    }

    // Languages Section - Template-specific title with styled background
    if (resumeData.languages && resumeData.languages.length > 0) {
      sections.push(createSectionHeader(config.languagesTitle, template));

      resumeData.languages.forEach((lang) => {
        sections.push(
          new Paragraph({
            spacing: { after: 50 },
            text: `${lang.name || 'Language'} - ${lang.proficiency || 'Proficiency'}`,
          })
        );
      });
      sections.push(new Paragraph({ spacing: { after: 300 } }));
    }

    // Achievements Section - Template-specific title with styled background
    if (resumeData.achievements) {
      sections.push(createSectionHeader(config.achievementsTitle, template));
      sections.push(
        new Paragraph({
          text: resumeData.achievements,
          spacing: { after: 300 },
          indent: { left: 100 },
        })
      );
    }

    // Interests Section - Template-specific title with styled background
    if (resumeData.interests) {
      sections.push(createSectionHeader(config.interestsTitle, template));
      sections.push(
        new Paragraph({
          text: resumeData.interests,
          spacing: { after: 300 },
          indent: { left: 100 },
        })
      );
    }

    // Create the document with page borders
    const doc = new Document({
      sections: [
        {
          properties: {
            page: {
              margin: {
                top: 720, // 0.5 inch
                right: 720,
                bottom: 720,
                left: 720,
              },
              borders: {
                pageBorderTop: {
                  style: BorderStyle.SINGLE,
                  size: 12,
                  color: template === 'modern' ? '2563eb' : 
                         template === 'creative' ? '7c3aed' :
                         template === 'technical' ? '0f172a' : '1e293b',
                },
                pageBorderBottom: {
                  style: BorderStyle.SINGLE,
                  size: 12,
                  color: template === 'modern' ? '2563eb' : 
                         template === 'creative' ? '7c3aed' :
                         template === 'technical' ? '0f172a' : '1e293b',
                },
                pageBorderLeft: {
                  style: BorderStyle.SINGLE,
                  size: 12,
                  color: template === 'modern' ? '2563eb' : 
                         template === 'creative' ? '7c3aed' :
                         template === 'technical' ? '0f172a' : '1e293b',
                },
                pageBorderRight: {
                  style: BorderStyle.SINGLE,
                  size: 12,
                  color: template === 'modern' ? '2563eb' : 
                         template === 'creative' ? '7c3aed' :
                         template === 'technical' ? '0f172a' : '1e293b',
                },
              },
            },
          },
          children: sections,
        },
      ],
    });

    // Generate and return the DOCX blob
    const blob = await Packer.toBlob(doc);
    return blob;
    
  } catch (error) {
    console.error('Error exporting to DOCX:', error);
    throw error;
  }
};

/**
 * Download resume as DOCX file
 * @param {Object} resumeData - The resume data
 * @param {string} filename - The filename (without extension)
 * @param {string} template - The selected template name
 */
export const downloadDOCX = async (resumeData, filename = 'resume', template = 'modern') => {
  try {
    console.log('📥 Downloading DOCX with template:', template);
    const blob = await exportToDOCX(resumeData, template);
    saveAs(blob, `${filename}.docx`);
  } catch (error) {
    console.error('Error downloading DOCX:', error);
    throw error;
  }
};

/**
 * Save resume to backend with session ID before download
 * @param {Object} resumeData - The resume data
 * @param {string} sessionId - Optional session ID
 * @returns {Promise<Object>} - Response with session details
 */
export const saveResumeSession = async (resumeData, sessionId = null) => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    const response = await fetch(`${API_URL}/api/resume/download-session`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        resumeData,
        sessionId,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to save resume session');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error saving resume session:', error);
    throw error;
  }
};
