// Admin Layout Component
import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/session.js";
import {useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {FaBell, FaShoppingCart, FaUser} from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import Footer from "../components/Footer.jsx";

const UserLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
    const location = useLocation();
    const authState = useSelector(state => state.auth);

    // These would typically come from your Redux store
    const cartItemCount = 3; // Example value
    const notificationCount = 5; // Example value

    useEffect(() => {
        setIsAuthenticated(getAccessToken());
    }, [location, authState]);

    return (
        <div className="UserApp d-flex flex-column min-vh-100">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    {/* Logo - Always visible */}
                    <Navbar.Brand href="/">
                        <img
                            src="/logo.png"
                            width="30"
                            height="30"
                            className="d-inline-block align-top me-2"
                            alt="Web2D Logo"
                        />
                        Web2D
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {/* Only show navigation items when authenticated */}
                        {isAuthenticated ? (
                            <Nav className="me-auto">
                                {/* Home Link */}
                                <Nav.Link href="/">Home</Nav.Link>

                                {/* Games Dropdown */}
                                <NavDropdown title="Games" id="games-dropdown">
                                    <NavDropdown.Item href="/games/mobile">Game Mobile</NavDropdown.Item>
                                    <NavDropdown.Item href="/games/web">Game Web</NavDropdown.Item>
                                    <NavDropdown.Item href="/games/blockchain">Blockchain</NavDropdown.Item>
                                </NavDropdown>

                                {/* Blogs Link */}
                                <Nav.Link href="/blogs">Blogs</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav className="me-auto">
                                {/* Empty nav when not authenticated */}
                            </Nav>
                        )}

                        {!isAuthenticated ? (
                            <Nav>
                                <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link>
                            </Nav>
                        ) : (
                            <Nav>
                                {/* Cart Icon with Badge */}
                                <Nav.Link href="/cart" className="position-relative me-3">
                                    <FaShoppingCart size={20} />
                                    {cartItemCount > 0 && (
                                        <Badge
                                            pill
                                            bg="danger"
                                            className="position-absolute top-0 start-100 translate-middle"
                                            style={{ fontSize: '0.6rem' }}
                                        >
                                            {cartItemCount}
                                        </Badge>
                                    )}
                                </Nav.Link>

                                {/* Notification Icon with Badge */}
                                <Nav.Link href="/notifications" className="position-relative me-3">
                                    <FaBell size={20} />
                                    {notificationCount > 0 && (
                                        <Badge
                                            pill
                                            bg="danger"
                                            className="position-absolute top-0 start-100 translate-middle"
                                            style={{ fontSize: '0.6rem' }}
                                        >
                                            {notificationCount}
                                        </Badge>
                                    )}
                                </Nav.Link>

                                {/* User Avatar Dropdown */}
                                <NavDropdown
                                    title={
                                        <div className="d-inline-block">
                                            <FaUser size={20} />
                                        </div>
                                    }
                                    id="user-dropdown"
                                    align="end"
                                >
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            setIsAuthenticated(false);
                                            window.location.href = '/login';
                                        }}
                                    >
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="mt-4 flex-grow-1">
                {children}
            </Container>
            <Footer />
        </div>
    );
};
export default UserLayout;
