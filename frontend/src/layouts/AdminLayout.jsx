// Admin Layout Component
import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/session.js";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import {FaBoxOpen, FaChartBar, FaCog, FaShoppingBag, FaUsers, FaUserShield, FaImages } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

const AdminLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
    const location = useLocation();
    const authState = useSelector(state => state.auth);

    useEffect(() => {
        setIsAuthenticated(getAccessToken());
    }, [location, authState]);

    return (
        <div className="AdminApp">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    {/* Admin Logo */}
                    <Navbar.Brand href="/admin/dashboard">
                        <FaUserShield className="d-inline-block align-top me-2" size={24} />
                        Web2D Admin
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="admin-navbar-nav" />
                    <Navbar.Collapse id="admin-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/admin/dashboard">
                                <FaChartBar className="me-1" /> Dashboard
                            </Nav.Link>
                            <Nav.Link href="/admin/users">
                                <FaUsers className="me-1" /> Users
                            </Nav.Link>
                            <Nav.Link href="/admin/products">
                                <FaBoxOpen className="me-1" /> Products
                            </Nav.Link>
                            <Nav.Link href="/admin/banners">
                                <FaImages className="me-1" /> Banners
                            </Nav.Link>
                            <Nav.Link href="/admin/orders">
                                <FaShoppingBag className="me-1" /> Orders
                            </Nav.Link>
                            <Nav.Link href="/admin/settings">
                                <FaCog className="me-1" /> Settings
                            </Nav.Link>
                        </Nav>

                        <Nav>
                            <NavDropdown
                                title={
                                    <div className="d-inline-block">
                                        <FaUserShield size={20} /> Admin
                                    </div>
                                }
                                id="admin-dropdown"
                                align="end"
                            >
                                <NavDropdown.Item href="/admin/profile">Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item
                                    onClick={() => {
                                        localStorage.removeItem('token');
                                        setIsAuthenticated(false);
                                        window.location.href = '/admin/login';
                                    }}
                                >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4">
                {children}
            </Container>
        </div>
    );
};
export default AdminLayout;
