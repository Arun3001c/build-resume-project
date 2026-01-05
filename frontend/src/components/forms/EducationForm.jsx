import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './EducationForm.css';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

const EducationForm = () => {
  const { resumeData, updateEducation } = useResume();
  const { education } = resumeData;

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: ''
    };
    updateEducation([...education, newEdu]);
  };

  const removeEducation = (id) => {
    updateEducation(education.filter(edu => edu.id !== id));
  };

  const updateEdu = (id, field, value) => {
    updateEducation(
      education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  return (
    <div className="education-form">
      <div className="form-header">
        <div className="header-left">
          <GraduationCap className="form-icon" />
          <h2>Education</h2>
        </div>
        <button onClick={addEducation} className="add-button">
          <Plus className="button-icon" />
          Add
        </button>
      </div>

      <div className="education-list">
        {education.map((edu, index) => (
          <div key={edu.id} className="education-item">
            <div className="item-header">
              <span className="item-number">Education {index + 1}</span>
              {education.length > 1 && (
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="delete-button"
                >
                  <Trash2 className="delete-icon" />
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Degree *</label>
              <input
                type="text"
                value={edu.degree}
                onChange={(e) => updateEdu(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Institution *</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateEdu(edu.id, 'institution', e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  value={edu.location}
                  onChange={(e) => updateEdu(edu.id, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Graduation Date *</label>
                <input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEdu(edu.id, 'graduationDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>GPA (Optional)</label>
                <input
                  type="text"
                  value={edu.gpa}
                  onChange={(e) => updateEdu(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationForm;