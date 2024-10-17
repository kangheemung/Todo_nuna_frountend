import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap'; // Importing Nav component from react-bootstrap
import { Link } from 'react-router-dom';
import './Navigation.style.css';

const Navigation = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Todo App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/" className="link">
                            Todo
                        </Link>
                        <Link to="/user" className="link">
                            Register
                        </Link>
                        <Link to="/login" className="link">
                            Login
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Navigation;
