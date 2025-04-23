import React from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import DarkModeToggle from '../../components/DarkModeToggle';

function Setting() {
  return (
    <Container>
      <h2 className="mb-4">Settings</h2>
      
      <Row>
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header>
              <h5>Appearance</h5>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-between">
              <div>
                <h6>Dark Mode</h6>
                <p className="text-muted mb-0">Toggle between light and dark theme</p>
              </div>
              <DarkModeToggle />
            </Card.Body>
          </Card>
        </Col>
        
        {/* Other settings cards */}
      </Row>
    </Container>
  );
}

export default Setting;