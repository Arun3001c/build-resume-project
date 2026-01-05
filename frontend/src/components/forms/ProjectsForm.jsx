import React from 'react';
import { useResume } from '../../context/ResumeContext';
import './ProjectsForm.css';
import { FolderGit2, Plus, Trash2 } from 'lucide-react';

const ProjectsForm = () => {
  const { resumeData, updateProjects } = useResume();
  const { projects } = resumeData;

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    updateProjects([...projects, newProject]);
  };

  const removeProject = (id) => {
    updateProjects(projects.filter(proj => proj.id !== id));
  };

  const updateProj = (id, field, value) => {
    updateProjects(
      projects.map(proj => 
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  return (
    <div className="projects-form">
      <div className="form-header">
        <div className="header-left">
          <FolderGit2 className="form-icon" />
          <h2>Projects</h2>
        </div>
        <button onClick={addProject} className="add-button">
          <Plus className="button-icon" />
          Add
        </button>
      </div>

      <div className="projects-list">
        {projects.map((proj, index) => (
          <div key={proj.id} className="project-item">
            <div className="item-header">
              <span className="item-number">Project {index + 1}</span>
              {projects.length > 1 && (
                <button
                  onClick={() => removeProject(proj.id)}
                  className="delete-button"
                >
                  <Trash2 className="delete-icon" />
                </button>
              )}
            </div>

            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={proj.name}
                onChange={(e) => updateProj(proj.id, 'name', e.target.value)}
                placeholder="E-Commerce Platform"
              />
            </div>

            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={proj.description}
                onChange={(e) => updateProj(proj.id, 'description', e.target.value)}
                placeholder="Describe the project, your role, and key achievements..."
                className="textarea-input"
              />
            </div>

            <div className="form-group">
              <label>Technologies Used</label>
              <input
                type="text"
                value={proj.technologies}
                onChange={(e) => updateProj(proj.id, 'technologies', e.target.value)}
                placeholder="React, Node.js, MongoDB"
              />
            </div>

            <div className="form-group">
              <label>Project Link (Optional)</label>
              <input
                type="url"
                value={proj.link}
                onChange={(e) => updateProj(proj.id, 'link', e.target.value)}
                placeholder="github.com/username/project"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsForm;