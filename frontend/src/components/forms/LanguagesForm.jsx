import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './LanguagesForm.css';
import { Languages as LanguagesIcon, Plus, Trash2 } from 'lucide-react';

const proficiencyLevels = [
  'Native',
  'Fluent',
  'Professional Working',
  'Limited Working',
  'Elementary'
];

const LanguagesForm = () => {
  const { resumeData, updateLanguages } = useResume();
  const { languages } = resumeData;

  const addLanguage = () => {
    const newLang = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    updateLanguages([...languages, newLang]);
  };

  const removeLanguage = (id) => {
    updateLanguages(languages.filter(lang => lang.id !== id));
  };

  const updateLang = (id, field, value) => {
    updateLanguages(
      languages.map(lang => 
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    );
  };

  return (
    <div className="languages-form">
      <div className="form-header">
        <div className="header-left">
          <LanguagesIcon className="form-icon" />
          <h2>Languages</h2>
        </div>
        <button onClick={addLanguage} className="add-button">
          <Plus className="button-icon" />
          Add
        </button>
      </div>

      <div className="languages-list">
        {languages.map((lang, index) => (
          <div key={lang.id} className="language-item">
            <div className="item-header">
              <span className="item-number">Language {index + 1}</span>
              {languages.length > 1 && (
                <button
                  onClick={() => removeLanguage(lang.id)}
                  className="delete-button"
                >
                  <Trash2 className="delete-icon" />
                </button>
              )}
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Language *</label>
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateLang(lang.id, 'name', e.target.value)}
                  placeholder="English"
                />
              </div>
              <div className="form-group">
                <label>Proficiency *</label>
                <select 
                  value={lang.proficiency}
                  onChange={(e) => updateLang(lang.id, 'proficiency', e.target.value)}
                  className="select-input"
                >
                  <option value="">Select proficiency</option>
                  {proficiencyLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguagesForm;