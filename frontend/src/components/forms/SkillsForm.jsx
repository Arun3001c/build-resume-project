import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import './SkillsForm.css';
import { Wrench, Plus, X } from 'lucide-react';

const SkillsForm = () => {
  const { resumeData, updateSkills } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      updateSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    updateSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="skills-form">
      <div className="form-header">
        <div className="header-left">
          <Wrench className="form-icon" />
          <h2>Skills</h2>
        </div>
      </div>

      <div className="skills-content">
        <div className="add-skill-section">
          <div className="form-group">
            <label htmlFor="newSkill">Add Skill</label>
            <div className="input-with-button">
              <input
                type="text"
                id="newSkill"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., JavaScript, Python, Project Management"
              />
              <button onClick={addSkill} className="add-skill-button">
                <Plus className="add-icon" />
                Add
              </button>
            </div>
          </div>
        </div>

        {skills.length > 0 && (
          <div className="skills-list-section">
            <label className="skills-label">
              Your Skills ({skills.length})
            </label>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="skill-badge"
                >
                  <span className="skill-text">{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="remove-skill-button"
                  >
                    <X className="remove-icon" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="help-text">
          Add technical skills, soft skills, tools, and technologies you're proficient in
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;