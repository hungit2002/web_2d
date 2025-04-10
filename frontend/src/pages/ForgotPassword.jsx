import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  newPassword: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  verificationCode: yup.string().required('Verification code is required'),
});

const ForgotPassword = () => {
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
      // Here you would typically send the email to get verification code
      setShowVerificationCode(true);
    } else {
      // Here you would verify the code and update the password
      console.log('Reset password data:', data);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Reset Password</h2>
              <Form onSubmit={handleSubmit(onSubmit)}>
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

                {showVerificationCode && (
                  <>
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

                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        {...register('newPassword')}
                        isInvalid={!!errors.newPassword}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.newPassword?.message}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </>
                )}

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit" size="lg">
                    {showVerificationCode ? 'Reset Password' : 'Get Verification Code'}
                  </Button>
                </div>

                <div className="text-center mt-3">
                  <Link to="/login" className="text-decoration-none">
                    Back to Login
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

export default ForgotPassword; 