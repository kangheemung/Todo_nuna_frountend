import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './Navigation';
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';
function App() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const isLoggedIn = !!user;

    const getUser = async () => {
        //토큰을 통해 유저 정보를 가져온다.
        try {
            const storedToken = sessionStorage.getItem('token');
            if (storedToken) {
                const response = await api.get('/user/me');
                setUser(response.data.user);
            } else {
                navigate('/login'); // トークンがない場合はユーザーをnullに設定する
            }
            // const response = api.get('/user/??');
        } catch (error) {
            console.error('Error fetching user data:', error);
            navigate('/login');
        }
    };
    const handleLogout = () => {
        // Clear user session and redirect to login page
        sessionStorage.removeItem('token');
        setUser(null);
        navigate('/login'); // Redirect to login page after logout
    };
    useEffect(() => {
        getUser();
    }, [navigate]);
    return (
        <>
            <Navigation handleLogout={handleLogout} setUser={setUser} isLoggedIn={isLoggedIn} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute user={user}>
                            <TodoPage user={user} setUser={setUser} isLoggedIn={isLoggedIn} />
                        </PrivateRoute>
                    }
                />
                <Route path="/user" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
            </Routes>
        </>
    );
}

export default App;
