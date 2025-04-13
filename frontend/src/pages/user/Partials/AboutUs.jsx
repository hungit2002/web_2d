import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const AboutUs = () => {
  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">About Web2D</h1>
          <div className="bg-light p-4 rounded">
            <p className="lead">
              Welcome to Web2D - your premier destination for high-quality games and gaming products.
            </p>
            <p>
              Founded in 2020, we specialize in delivering exceptional gaming experiences across multiple platforms.
              Our carefully curated collection includes the latest and most popular titles in mobile gaming, web games,
              and blockchain-based games.
            </p>
          </div>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={12}>
          <h2 className="text-center mb-3">What We Offer</h2>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="h5">Quality Games</h3>
              <p>
                We provide a selection of high-quality games across various genres and platforms.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="h5">Secure Transactions</h3>
              <p>
                Our platform ensures safe and secure transactions for all your gaming purchases.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="h-100 shadow-sm">
            <Card.Body className="text-center">
              <h3 className="h5">Customer Support</h3>
              <p>
                We're dedicated to providing excellent customer service and support.
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="text-center bg-light p-4 rounded">
            <h2 className="mb-3">Our Mission</h2>
            <p>
              At Web2D, our mission is to connect gamers with the best gaming products and experiences.
              We strive to create a platform where gaming enthusiasts can discover, purchase, and enjoy
              quality games with ease and confidence.
            </p>
            <p className="mb-0">
              Thank you for choosing Web2D for your gaming needs. We look forward to serving you!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;