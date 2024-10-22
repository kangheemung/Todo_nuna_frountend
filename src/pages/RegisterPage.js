import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import '../App.css';
const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPassword, setSecPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (!name || !email || !password || !secPassword) {
                throw new Error('Please fill in all fields');
            }
            const response = await api.post('/user', { name, email, password });
            console.log('rrrr', response);
            ///api
            if (response.status === 200) {
                navigate('/login');
            } else if (response.status === 409) {
                setError('User with this email already exists. Please use a different email.');
            } else if (response.status === 400) {
                throw new Error(
                    response.data.error.message || 'You are already a registered user. Please log in instead.'
                );
            } else {
                throw new Error(response.data.error ? response.data.error.message : 'An error occurred');
            }
        } catch (error) {
            setError(
                error.response?.data?.error ||
                    error.message ||
                    'You are already a registered user. Please log in instead.'
            );
        }
    };
    return (
        <div className="display-center">
            {error && <div className="red-error">{error}</div>}
            <Form className="login-box" onSubmit={handleSubmit}>
                <h1>회원가입</h1>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="string" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                </Form.Group>

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

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>re-enter the password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="re-enter the password"
                        onChange={(e) => setSecPassword(e.target.value)}
                    />
                </Form.Group>

                <Button className="button-primary" type="submit">
                    회원가입
                </Button>
            </Form>
        </div>
    );
};

export default RegisterPage;
