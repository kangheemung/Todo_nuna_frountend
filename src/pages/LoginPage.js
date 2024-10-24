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
                setUser(response.data.user);
                sessionStorage.setItem('token', response.data.token);
                api.defaults.headers['authorization'] = 'Bearer ' + response.data?.token;
                setError('');
                navigate('/task');
            } else if (response.status === 409) {
                setError(response.data.error.message);
            } else if (response.status === 400) {
                throw new Error(response.data.error.message);
            } else {
                throw new Error(response.data.error ? response.data.error.message : 'An error occurred');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data.message); // エラーメッセージ修正
            } else if (error.response && error.response.status === 404) {
                setError('Account not found. Please register.');
            } else {
                setError(error.message || 'Internal Server Error');
            }
        }
    };

    if (user) {
        return <Navigate to="/task" />;
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
                        계정이 없다면? <Link to="/register">회원가입 하기</Link>
                    </span>
                </div>
            </Form>
        </div>
    );
};

export default LoginPage;
