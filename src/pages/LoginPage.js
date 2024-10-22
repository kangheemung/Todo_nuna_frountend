import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import api from '../utils/api';
import './LoginPage.style.css';
const LoginPage = ({ user, setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        if (!email || !password) {
            setError('Email and password are required');
            return;
        }
        try {
            const response = await api.post('/user/login', { email, password });

            console.log(response); // レスポンス内容を確認

            if (response && response.status === 200) {
                setUser(response?.data?.user);
                sessionStorage.setItem('token', response?.data?.token);
                api.defaults.headers['authorization'] = 'Bearer ' + response?.data?.token;
                setError('');
                navigate('/');
            }
            throw new Error(response.data.message);
        } catch (error) {
            setError(error.message);
        }
    };

    if (user) {
        return <Navigate to="/" />;
    }
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
                        계정이 없다면? <Link to="/user">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
