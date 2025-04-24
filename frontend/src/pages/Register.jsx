import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { register as registerUser } from '../services/auth.service';
import { useTranslation } from 'react-i18next';

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    fullName: yup.string().required(t('validation.fullNameRequired')),
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(8, t('validation.passwordMinLength'))
      .required(t('validation.passwordRequired')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validation.passwordMatch'))
      .required(t('validation.passwordRequired')),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      await registerUser(data);
      navigate('/customer/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <div className="card">
            <div className="card-body">
              <h2 className="text-center mb-4">{t('auth.registerTitle')}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>{t('common.fullName')}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={t('common.fullName')}
                    {...register('fullName')}
                    isInvalid={!!errors.fullName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t('common.email')}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={t('common.email')}
                    {...register('email')}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t('common.password')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('common.password')}
                    {...register('password')}
                    isInvalid={!!errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{t('common.confirmPassword')}</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder={t('common.confirmPassword')}
                    {...register('confirmPassword')}
                    isInvalid={!!errors.confirmPassword}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword?.message}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : t('common.register')}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>
                  {t('auth.alreadyHaveAccount')}{' '}
                  <Link to="/customer/login">{t('common.login')}</Link>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
