import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './OptionalFieldsForm.css';
import { Star } from 'lucide-react';

const OptionalFieldsForm = () => {
  const { resumeData, updateOptionalFields } = useResume();

  return (
    <div className="optional-fields-form">
      <div className="form-header">
        <div className="header-left">
          <Star className="form-icon" />
          <h2>Optional Sections</h2>
        </div>
      </div>

      <div className="fields-container">
        <div className="form-group">
          <label htmlFor="achievements">Achievements (Optional)</label>
          <textarea
            id="achievements"
            value={resumeData.achievements}
            onChange={(e) => updateOptionalFields('achievements', e.target.value)}
            placeholder="List any notable achievements, awards, or recognitions..."
            className="textarea-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="interests">Interests (Optional)</label>
          <textarea
            id="interests"
            value={resumeData.interests}
            onChange={(e) => updateOptionalFields('interests', e.target.value)}
            placeholder="Share your professional interests or hobbies..."
            className="textarea-input"
          />
        </div>
      </div>

      <p className="help-text">
        These sections are optional and can help personalize your resume
      </p>
    </div>
  );
};

export default OptionalFieldsForm;