import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './Navigation';
import PrivateRoute from './route/PrivateRoute';
import api from './utils/api';
function App() {
    const [user, setUser] = useState(null);

    const isLoggedIn = !!user;

    const getUser = async () => {
        //토큰을 통해 유저 정보를 가져온다.
        try {
            const storedToken = sessionStorage.setItem('token');
            if (storedToken) {
                const response = await api.get('/user/me');
                console.log('API Response:', response); // Log the full response object for debugging
                setUser(response.data.user);
            } else {
                console.error('User data not found in response');
                setUser(null);
            }
            // const response = api.get('/user/??');
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };
    const handleLogout = () => {
        // Clear user session and redirect to login page
        sessionStorage.removeItem('token');
        setUser(null);
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <Navigation handleLogout={handleLogout} setUser={setUser} isLoggedIn={isLoggedIn} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute user={user}>
                            <TodoPage
                                user={user}
                                setUser={setUser}
                                isLoggedIn={isLoggedIn}
                                handleLogout={handleLogout}
                            />
                        </PrivateRoute>
                    }
                />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage user={user} setUser={setUser} />} />
            </Routes>
        </>
    );
}

export default App;
