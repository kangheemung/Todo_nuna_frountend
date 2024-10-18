import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../utils/api';
import './LoginPage.style.css';
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            if (!email || !password) {
                throw new Error('Email and password are required');
            }
            const response = await api.post('/user/login', { email, password });
            console.log('Response:', response);

            if (response.status === 200) {
                setUser(response.data.user);
                sessionStorage.setItem('token', response.data.token);
                api.defaults.headers['authorization'] = 'Bearer ' + response.data.token;
                setError('');
                navigate('/');
                // Successful response handling logic can be added here if needed
            } else if (response.data.status === 'fail') {
                throw new Error(response.data.error); // Throw an error if authentication fails
            } else {
                throw new Error('An error occurred during login');
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
