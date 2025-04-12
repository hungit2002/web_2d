import React from 'react';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Settings = () => {
  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header>
          <h4>Admin Settings</h4>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Site Name</Form.Label>
              <Form.Control type="text" placeholder="Enter site name" />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control type="email" placeholder="Enter contact email" />
            </Form.Group>
            
            <Button variant="primary" type="submit">
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Settings;