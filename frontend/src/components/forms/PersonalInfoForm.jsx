import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import './PersonalInfoForm.css';
import { User, Upload, X } from 'lucide-react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo, updateProfilePhoto } = useResume();
  const { personalInfo } = resumeData;
  const [photoPreview, setPhotoPreview] = useState(personalInfo.profilePhoto);

  const handleChange = (field, value) => {
    updatePersonalInfo({ [field]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        updateProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    updateProfilePhoto(null);
  };

  return (
    <div className="personal-info-form">
      <div className="form-header">
        <div className="header-left">
          <User className="form-icon" />
          <h2>Personal Information</h2>
        </div>
      </div>

      <div className="form-content">
        {/* Profile Photo */}
        <div className="photo-section">
          <div className="photo-container">
            {photoPreview ? (
              <div className="photo-preview">
                <img 
                  src={photoPreview} 
                  alt="Profile" 
                  className="profile-photo"
                />
                <button
                  onClick={removePhoto}
                  className="remove-photo-button"
                >
                  <X className="remove-icon" />
                </button>
              </div>
            ) : (
              <div className="photo-placeholder">
                <User className="placeholder-icon" />
              </div>
            )}
          </div>
          <div className="photo-upload-section">
            <label className="photo-label">Profile Photo (Optional)</label>
            <label htmlFor="photo-upload" className="upload-button">
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden-input"
              />
              <Upload className="upload-icon" />
              Upload Photo
            </label>
          </div>
        </div>

        {/* Full Name */}
        <div className="form-group">
          <label htmlFor="fullName">Full Name *</label>
          <input
            type="text"
            id="fullName"
            value={personalInfo.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        {/* Email & Phone */}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              value={personalInfo.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="john@email.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              value={personalInfo.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label htmlFor="location">Location *</label>
          <input
            type="text"
            id="location"
            value={personalInfo.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        {/* LinkedIn & Website */}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              value={personalInfo.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="linkedin.com/in/johndoe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="website">Website/Portfolio</label>
            <input
              type="url"
              id="website"
              value={personalInfo.website}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="johndoe.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;