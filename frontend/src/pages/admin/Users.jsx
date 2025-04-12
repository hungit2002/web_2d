import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

const Users = () => {
  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header>
          <h4>User Management</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* User data will go here */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Users;