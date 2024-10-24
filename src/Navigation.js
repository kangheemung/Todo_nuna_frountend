import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap'; // Importing Nav component from react-bootstrap
import { Link } from 'react-router-dom';
import './Navigation.style.css';

const Navigation = ({ handleLogout, isLoggedIn }) => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        {!isLoggedIn && (
                            <>
                                <Link to="/register" className="link">
                                    Register
                                </Link>
                                <Link to="/" className="link">
                                    Login
                                </Link>
                            </>
                        )}
                        {isLoggedIn && (
                            <Nav className="mr-auto">
                                <Link to="/task" className="link">
                                    Todo
                                </Link>
                                <button className="login_link" onClick={handleLogout}>
                                    Logout
                                </button>
                            </Nav>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;
