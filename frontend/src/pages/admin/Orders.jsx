import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

const Orders = () => {
  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header>
          <h4>Order Management</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Order data will go here */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Orders;