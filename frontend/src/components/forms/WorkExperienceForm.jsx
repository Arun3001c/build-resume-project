import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './WorkExperienceForm.css';
import { Briefcase, Plus, Trash2 } from 'lucide-react';

const WorkExperienceForm = () => {
  const { resumeData, updateWorkExperience } = useResume();
  const { workExperience } = resumeData;

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    updateWorkExperience([...workExperience, newExp]);
  };

  const removeExperience = (id) => {
    updateWorkExperience(workExperience.filter(exp => exp.id !== id));
  };

  const updateExp = (id, field, value) => {
    updateWorkExperience(
      workExperience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  return (
    <div className="work-experience-form">
      <div className="form-header">
        <div className="header-left">
          <Briefcase className="form-icon" />
          <h2>Work Experience</h2>
        </div>
        <button onClick={addExperience} className="add-button">
          <Plus className="button-icon" />
          Add
        </button>
      </div>

      <div className="experience-list">
        {workExperience.map((exp, index) => (
          <div key={exp.id} className="experience-item">
            <div className="item-header">
              <span className="item-number">Experience {index + 1}</span>
              {workExperience.length > 1 && (
                <button
                  onClick={() => removeExperience(exp.id)}
                  className="delete-button"
                >
                  <Trash2 className="delete-icon" />
                </button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Position *</label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) => updateExp(exp.id, 'position', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div className="form-group">
                <label>Company *</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateExp(exp.id, 'company', e.target.value)}
                  placeholder="Tech Company Inc."
                />
              </div>
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={exp.location}
                onChange={(e) => updateExp(exp.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Start Date *</label>
                <input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExp(exp.id, 'startDate', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>End Date</label>
                <input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExp(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className={exp.current ? 'disabled-input' : ''}
                />
              </div>
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id={`current-${exp.id}`}
                checked={exp.current}
                onChange={(e) => updateExp(exp.id, 'current', e.target.checked)}
                className="checkbox-input"
              />
              <label
                htmlFor={`current-${exp.id}`}
                className="checkbox-label"
              >
                I currently work here
              </label>
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateExp(exp.id, 'description', e.target.value)}
                placeholder="Describe your responsibilities and achievements..."
                className="textarea-input"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperienceForm;