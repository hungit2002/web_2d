import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { login } from '../services/auth.service';
import { setCredentials } from '../store/slices/authSlice';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email(t('validation.invalidEmail')).required(t('validation.emailRequired')),
    password: yup
      .string()
      .min(8, t('validation.passwordMinLength'))
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
      const response = await login(data);
      dispatch(setCredentials(response));
      navigate('/customer/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
              <h2 className="text-center mb-4">{t('auth.loginTitle')}</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <Form.Check
                    type="checkbox"
                    label={t('auth.rememberMe')}
                  />
                  <Link to="/customer/forgot-password">{t('auth.forgotPassword')}</Link>
                </div>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : t('common.login')}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <p>
                  {t('auth.dontHaveAccount')}{' '}
                  <Link to="/customer/register">{t('common.register')}</Link>
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
