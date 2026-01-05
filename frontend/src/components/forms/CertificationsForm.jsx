import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './CertificationsForm.css';
import { Award, Plus, Trash2 } from 'lucide-react';

const CertificationsForm = () => {
  const { resumeData, updateCertifications } = useResume();
  const { certifications } = resumeData;

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: ''
    };
    updateCertifications([...certifications, newCert]);
  };

  const removeCertification = (id) => {
    updateCertifications(certifications.filter(cert => cert.id !== id));
  };

  const updateCert = (id, field, value) => {
    updateCertifications(
      certifications.map(cert => 
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  return (
    <div className="certifications-form">
      <div className="form-header">
        <div className="header-left">
          <Award className="form-icon" />
          <h2>Certifications</h2>
        </div>
        <button onClick={addCertification} className="add-button">
          <Plus className="button-icon" />
          Add
        </button>
      </div>

      <div className="certifications-list">
        {certifications.map((cert, index) => (
          <div key={cert.id} className="certification-item">
            <div className="item-header">
              <span className="item-number">Certification {index + 1}</span>
              {certifications.length > 1 && (
                <button
                  onClick={() => removeCertification(cert.id)}
                  className="delete-button"
                >
                  <Trash2 className="delete-icon" />
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Certification Name *</label>
              <input
                type="text"
                value={cert.name}
                onChange={(e) => updateCert(cert.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label>Issuing Organization *</label>
                <input
                  type="text"
                  value={cert.issuer}
                  onChange={(e) => updateCert(cert.id, 'issuer', e.target.value)}
                  placeholder="Amazon Web Services"
                />
              </div>
              <div className="form-group">
                <label>Date Obtained *</label>
                <input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCert(cert.id, 'date', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsForm;