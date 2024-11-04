import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Section from './Section';

function ResumeBuilder() {
  const [sections, setSections] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editSectionId, setEditSectionId] = useState(null);
  const [sectionForm, setSectionForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('/resume-sections/')
      .then(response => setSections(response.data));
    axios.get('/templates/')
      .then(response => setTemplates(response.data));
  }, []);

  // Handler for template selection
  const handleTemplateSelect = (templateId) => {
    const selected = templates.find(t => t.id === templateId);
    setSelectedTemplate(selected);
  };

  // Start editing a section
  const handleEdit = (section) => {
    setEditSectionId(section.id);
    setSectionForm({ title: section.title, content: section.content });
  };

  // Save or update a section
  const handleSave = () => {
    if (editSectionId) {
      axios.put(`/resume-sections/${editSectionId}/`, sectionForm)
        .then(response => {
          setSections(sections.map(s => s.id === editSectionId ? response.data : s));
          setEditSectionId(null);
        });
    } else {
      axios.post('/resume-sections/', { ...sectionForm, user_id: 1 }) // Assuming user ID
        .then(response => {
          setSections([...sections, response.data]);
          setSectionForm({ title: '', content: '' });
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`/resume-sections/${id}/`)
      .then(() => setSections(sections.filter(section => section.id !== id)));
  };

  return (
    <div>
      <select onChange={(e) => handleTemplateSelect(parseInt(e.target.value))}>
        <option value="">Choose a template</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>{template.name}</option>
        ))}
      </select>

  {selectedTemplate && 
    <div>
      <h1>Resume</h1>
      {sections.map((section) => 
        editSectionId === section.id ? (
          <div key={section.id}>
            <input 
              value={sectionForm.title} 
              onChange={(e) => setSectionForm({...sectionForm, title: e.target.value})} 
              placeholder="Title" 
            />
            <textarea 
              value={sectionForm.content} 
              onChange={(e) => setSectionForm({...sectionForm, content: e.target.value})} 
              placeholder="Content" 
            />
            <button onClick={handleSave}>Save</button>
            <button onClick={() => setEditSectionId(null)}>Cancel</button>
          </div>
        ) : (
          <Section 
            key={section.id} 
            title={section.title} 
            content={section.content}
            onEdit={() => handleEdit(section)} 
            onDelete={() => handleDelete(section.id)} 
          />
        )
      )}
    </div>
  }
  <button onClick={() => setEditSectionId(null)}>Add New Section</button>
</div>
);
}

export default ResumeBuilder;