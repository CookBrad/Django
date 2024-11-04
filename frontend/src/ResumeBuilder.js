import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Importing necessary Ant Design components
import { Select, Button, Input, Form, Row, Col, Typography } from 'antd';
import Section from './Section';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

function ResumeBuilder() {
  const [sections, setSections] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [editSectionId, setEditSectionId] = useState(null);
  const [sectionForm] = Form.useForm();

  useEffect(() => {
    axios.get('/resume-sections/')
      .then(response => setSections(response.data));
    axios.get('/templates/')
      .then(response => setTemplates(response.data));
  }, []);

  const handleTemplateSelect = (templateId) => {
    const selected = templates.find(t => t.id === templateId);
    setSelectedTemplate(selected);
  };

  const handleEdit = (section) => {
    setEditSectionId(section.id);
    sectionForm.setFieldsValue({ title: section.title, content: section.content });
  };

  const handleSave = () => {
    sectionForm.validateFields().then(values => {
      if (editSectionId) {
        axios.put(`/resume-sections/${editSectionId}/`, values)
          .then(response => {
            setSections(sections.map(s => s.id === editSectionId ? response.data : s));
            setEditSectionId(null);
            sectionForm.resetFields();
          });
      } else {
        axios.post('/resume-sections/', { ...values, user_id: 1 })
          .then(response => {
            setSections([...sections, response.data]);
            sectionForm.resetFields();
          });
      }
    });
  };

  const handleDelete = (id) => {
    axios.delete(`/resume-sections/${id}/`)
      .then(() => setSections(sections.filter(section => section.id !== id)));
  };

  return (
    <div>
      <Select placeholder="Choose a template" onChange={(e) => handleTemplateSelect(e)}>
        {templates.map(template => (
          <Option key={template.id} value={template.id}>{template.name}</Option>
        ))}
      </Select>
      
      {selectedTemplate && (
        <>
          <Title level={2}>Resume</Title>
          <Row gutter={[16, 16]}>
            {sections.map((section) => 
              editSectionId === section.id ? (
                <Col span={24} key={section.id}>
                  <Form form={sectionForm} layout="vertical">
                    <Form.Item name="title" label="Title">
                      <Input placeholder="Title" />
                    </Form.Item>
                    <Form.Item name="content" label="Content">
                      <TextArea rows={4} placeholder="Content" />
                    </Form.Item>
                    <Form.Item>
                      <Button type="primary" onClick={handleSave}>Save</Button>
                      <Button style={{ marginLeft: '10px' }} onClick={() => setEditSectionId(null)}>Cancel</Button>
                    </Form.Item>
                  </Form>
                </Col>
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
          </Row>
        </>
      )}
      <Button onClick={() => setEditSectionId(null)} type="dashed" block>Add New Section</Button>
    </div>
  );
}

export default ResumeBuilder;