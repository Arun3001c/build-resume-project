// src/utils/pdfExport.js
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

/**
 * Export resume as DOCX
 * @param {Object} resumeData - The resume data
 * @returns {Promise<Blob>} - DOCX blob
 */
export const exportToDOCX = async (resumeData) => {
  try {
    console.log('Exporting to DOCX:', resumeData);
    
    const sections = [];

    // Personal Info Section
    const personalInfo = resumeData.personalInfo || {};
    sections.push(
      new Paragraph({
        text: personalInfo.fullName || 'Your Name',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: {
          after: 200,
        },
      })
    );

    // Contact Information
    const contactLines = [];
    if (personalInfo.email) contactLines.push(personalInfo.email);
    if (personalInfo.phone) contactLines.push(personalInfo.phone);
    if (personalInfo.location) contactLines.push(personalInfo.location);
    
    if (contactLines.length > 0) {
      sections.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
          children: [
            new TextRun({
              text: contactLines.join(' | '),
              size: 20,
            }),
          ],
        })
      );
    }

    // LinkedIn and Website
    const linkLines = [];
    if (personalInfo.linkedin) linkLines.push(`LinkedIn: ${personalInfo.linkedin}`);
    if (personalInfo.website) linkLines.push(`Website: ${personalInfo.website}`);
    
    if (linkLines.length > 0) {
      sections.push(
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
          children: [
            new TextRun({
              text: linkLines.join(' | '),
              size: 20,
            }),
          ],
        })
      );
    }

    // Summary Section
    if (resumeData.summary) {
      sections.push(
        new Paragraph({
          text: 'PROFESSIONAL SUMMARY',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
        new Paragraph({
          text: resumeData.summary,
          spacing: { after: 300 },
        })
      );
    }

    // Work Experience Section
    if (resumeData.workExperience && resumeData.workExperience.length > 0) {
      sections.push(
        new Paragraph({
          text: 'WORK EXPERIENCE',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

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

    // Education Section
    if (resumeData.education && resumeData.education.length > 0) {
      sections.push(
        new Paragraph({
          text: 'EDUCATION',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

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

    // Skills Section
    if (resumeData.skills && resumeData.skills.length > 0) {
      sections.push(
        new Paragraph({
          text: 'SKILLS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
        new Paragraph({
          text: resumeData.skills.join(' • '),
          spacing: { after: 300 },
        })
      );
    }

    // Projects Section
    if (resumeData.projects && resumeData.projects.length > 0) {
      sections.push(
        new Paragraph({
          text: 'PROJECTS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

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

    // Certifications Section
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      sections.push(
        new Paragraph({
          text: 'CERTIFICATIONS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

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

    // Languages Section
    if (resumeData.languages && resumeData.languages.length > 0) {
      sections.push(
        new Paragraph({
          text: 'LANGUAGES',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        })
      );

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

    // Achievements Section
    if (resumeData.achievements) {
      sections.push(
        new Paragraph({
          text: 'ACHIEVEMENTS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
        new Paragraph({
          text: resumeData.achievements,
          spacing: { after: 300 },
        })
      );
    }

    // Interests Section
    if (resumeData.interests) {
      sections.push(
        new Paragraph({
          text: 'INTERESTS',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 200, after: 100 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),
        new Paragraph({
          text: resumeData.interests,
          spacing: { after: 300 },
        })
      );
    }

    // Create the document
    const doc = new Document({
      sections: [
        {
          properties: {},
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
 */
export const downloadDOCX = async (resumeData, filename = 'resume') => {
  try {
    const blob = await exportToDOCX(resumeData);
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
