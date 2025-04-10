import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { vietnameseCities } from '../constants/cities';

const schema = yup.object().shape({
  fullName: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  address: yup.string().required('Address is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, 'Phone number must be valid')
    .required('Phone number is required'),
  verificationCode: yup.string().required('Verification code is required'),
});

const Register = () => {
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    if (!showVerificationCode) {
      // Here you would typically send the data to your backend
      // to request a verification code
      setShowVerificationCode(true);
    } else {
      // Here you would verify the code and complete registration
      console.log('Registration data:', data);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Registration</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your full name"
                    {...register('fullName')}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    {...register('email')}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    {...register('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    {...register('address')}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your country"
                    {...register('country')}
                    isInvalid={!!errors.country}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.country?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>City</Form.Label>
                  <Form.Select 
                    {...register('city')} 
                    isInvalid={!!errors.city}
                    placeholder="Select your city"
                  >
                    <option value="">Select a city</option>
                    {Object.entries(vietnameseCities).map(([key, value]) => (
                      <option key={key} value={key}>
                        {value}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.city?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter your phone number"
                    {...register('phone')}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                {showVerificationCode && (
                  <Form.Group className="mb-3">
                    <Form.Label>Verification Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter verification code"
                      {...register('verificationCode')}
                      isInvalid={!!errors.verificationCode}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.verificationCode?.message}
                    </Form.Control.Feedback>
                  </Form.Group>
                )}

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    {showVerificationCode ? 'Complete Registration' : 'Get Verification Code'}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <span>Already have an account? </span>
                  <Link to="/login" className="text-decoration-none">
                    Login
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register; 