// Section.js
import React from 'react';

function Section({ title, content, onEdit, onDelete }) {
  return (
    <div className="section">
      <h2 className="section-title">{title}</h2>
      <p>{content}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

export default Section;