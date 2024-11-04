import React from 'react';
import { Button, Col, Input, Typography } from 'antd';
const { Title, Paragraph } = Typography;
const { TextArea } = Input;

function Section({ title, content, onEdit, onDelete }) {
  return (
    <div className="section">
      <Col style={{ padding: '16px' }} span={24}>
        <Title level={2}>{title}</Title>
        <Paragraph>{content}</Paragraph>
        <Button onClick={onEdit}>Edit</Button>
        <Button onClick={onDelete}>Delete</Button>
      </Col>
    </div>
  );
}

export default Section;