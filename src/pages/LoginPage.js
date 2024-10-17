import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../utils/api';
import './LoginPage.style.css';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                throw new Error('Email or password is missing');
            }
            const response = await api.post('/user/login', { email, password });
            console.log('Response:', response);
            if (response.data.status === 'fail' && response.data.error === 'User not found') {
                throw new Error('User not found. Please check your email and password.');
            }

            if (response.status === 200) {
                // Successful response handling logic can be added here if needed
            } else {
                throw new Error(response.data.error); // Adjusted to access the 'error' field for the message
            }
        } catch (error) {
             console.error(error); // Log the error message for debugging
            setError(error.message);
        }
    };

    return (
        <div className="display-center">
            {error && <div className="red-error">{error}</div>}
            <Form className="login-box" onSubmit={handleLogin}>
                <h1>로그인</h1>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <div className="button-box">
                    <Button type="submit" className="button-primary">
                        Login
                    </Button>
                    <span>
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
