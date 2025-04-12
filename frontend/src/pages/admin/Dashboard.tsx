import React, { useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table } from 'react-bootstrap';

function Dashboard({ user }) {
    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={12}>
                    <Card className="mb-4">
                        <Card.Header>
                            <h4>Admin Dashboard</h4>
                        </Card.Header>
                        <Card.Body>
                            <h5>Welcome, {user?.fullName || 'Admin'}</h5>
                            <p>This is your admin control panel. You can manage your site from here.</p>

                            <Row className="mt-4">
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-primary text-white">
                                        <Card.Body>
                                            <h3>125</h3>
                                            <p>Total Users</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-success text-white">
                                        <Card.Body>
                                            <h3>45</h3>
                                            <p>Total Products</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col md={4}>
                                    <Card className="text-center mb-3 bg-info text-white">
                                        <Card.Body>
                                            <h3>18</h3>
                                            <p>New Orders</p>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            <h5 className="mt-4">Recent Orders</h5>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>#ORD-001</td>
                                        <td>John Doe</td>
                                        <td>2023-05-15</td>
                                        <td>$120.00</td>
                                        <td><span className="badge bg-success">Completed</span></td>
                                        <td>
                                            <Button size="sm" variant="outline-primary">View</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#ORD-002</td>
                                        <td>Jane Smith</td>
                                        <td>2023-05-14</td>
                                        <td>$85.50</td>
                                        <td><span className="badge bg-warning">Pending</span></td>
                                        <td>
                                            <Button size="sm" variant="outline-primary">View</Button>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>#ORD-003</td>
                                        <td>Robert Johnson</td>
                                        <td>2023-05-13</td>
                                        <td>$220.75</td>
                                        <td><span className="badge bg-info">Processing</span></td>
                                        <td>
                                            <Button size="sm" variant="outline-primary">View</Button>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}

export default Dashboard