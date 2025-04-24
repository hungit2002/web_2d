import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { getUserSession } from '../utils/session';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import DarkModeToggle from '../components/DarkModeToggle';
import Footer from '../components/Footer';

const UserLayout = ({ children }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getUserSession();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/customer/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/customer/dashboard">Web2D</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/customer/dashboard">{t('common.dashboard')}</Nav.Link>
              {/* Other nav links */}
            </Nav>
            <Nav>
              <LanguageSelector />
              <DarkModeToggle />
              {user ? (
                <NavDropdown title={user.fullName || user.email} id="user-dropdown">
                  <NavDropdown.Item as={Link} to="/customer/profile">{t('common.profile')}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/customer/orders">{t('common.orders')}</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/customer/settings">{t('common.settings')}</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>{t('common.logout')}</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Nav.Link as={Link} to="/customer/login">{t('common.login')}</Nav.Link>
                  <Nav.Link as={Link} to="/customer/register">{t('common.register')}</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="flex-grow-1">
        {children}
      </div>

      <Footer />
    </div>
  );
};

export default UserLayout;
