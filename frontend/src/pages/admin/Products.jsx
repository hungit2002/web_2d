import React from 'react';
import { Container, Card, Table, Button } from 'react-bootstrap';

const Products = () => {
  return (
    <Container fluid className="mt-4">
      <Card>
        <Card.Header>
          <h4>Product Management</h4>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Product data will go here */}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Products;