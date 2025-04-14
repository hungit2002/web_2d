// Admin Layout Component
import {useEffect, useState} from "react";
import {getAccessToken} from "../utils/session.js";
import {useLocation} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import {FaBell, FaShoppingCart, FaUser} from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import Footer from "../components/Footer.jsx";
import axios from 'axios';
import { fetchCartItems } from '../store/slices/cartSlice';

const UserLayout = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(getAccessToken());
    const [categories, setCategories] = useState([]);
    const location = useLocation();
    const dispatch = useDispatch();
    const authState = useSelector(state => state.auth);
    const { count: cartItemCount } = useSelector(state => state.cart);

    // Giá trị cứng cho thông báo
    const notificationCount = 5;

    useEffect(() => {
        setIsAuthenticated(getAccessToken());
    }, [location, authState]);

    // Fetch cart items when authenticated
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(fetchCartItems());
        }
    }, [isAuthenticated, dispatch]);

    useEffect(() => {
        // Fetch categories from the API
        const fetchCategories = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
                const response = await axios.get(`${API_URL}/categories`);
                setCategories(response.data.categories || []);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="UserApp d-flex flex-column min-vh-100">
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    {/* Logo - Always visible */}
                    <Navbar.Brand href="/customer">
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
                                <Nav.Link href="/customer">Home</Nav.Link>

                                {/* Games Dropdown */}
                                <NavDropdown title="Games" id="games-dropdown">
                                    {categories.map(category => (
                                        <NavDropdown.Item 
                                            key={category.id} 
                                            href={`/customer/games/category/${category.id}`}
                                        >
                                            {category.name}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>

                                {/* Blogs Link */}
                                <Nav.Link href="/customer/blogs">Blogs</Nav.Link>
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
                                <Nav.Link href="/customer/cart" className="position-relative me-3">
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

                                {/* Rest of the code remains the same */}
                                {/* Notification Icon with Badge */}
                                <Nav.Link href="/customer/notifications" className="position-relative me-3">
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
                                    <NavDropdown.Item href="/customer/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Item href="/customer/orders">Orders</NavDropdown.Item>
                                    <NavDropdown.Item href="/customer/settings">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item
                                        onClick={() => {
                                            localStorage.removeItem('token');
                                            setIsAuthenticated(false);
                                            window.location.href = '/customer/login';
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
