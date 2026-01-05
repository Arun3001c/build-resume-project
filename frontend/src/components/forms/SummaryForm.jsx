import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './SummaryForm.css';
import { FileText } from 'lucide-react';

const SummaryForm = () => {
  const { resumeData, updateSummary } = useResume();

  return (
    <div className="summary-form">
      <div className="form-header">
        <div className="header-left">
          <FileText className="form-icon" />
          <h2>Professional Summary</h2>
        </div>
      </div>

      <div className="form-content">
        <div className="form-group">
          <label htmlFor="summary">Summary *</label>
          <textarea
            id="summary"
            value={resumeData.summary}
            onChange={(e) => updateSummary(e.target.value)}
            placeholder="Write a compelling professional summary highlighting your key achievements and expertise..."
            className="summary-textarea"
          />
          <p className="help-text">
            2-3 sentences summarizing your experience and value proposition
          </p>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;