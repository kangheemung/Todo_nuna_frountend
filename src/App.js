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
    const getUser = async () => {
        //토큰을 통해 유저 정보를 가져온다.
        try {
            const storedToken = sessionStorage.getItem('token');
            if (storedToken) {
                // api.defaults.headers['authorization'] = 'Bearer ' + storedToken;
                const url = '/user/me';
                console.log('Requesting URL:', api.defaults.baseURL + url);
                const response = await api.get(url);
                console.log('Response Data:', response.data);
                setUser(response.data.user);
            }
            // const response = api.get('/user/??');
        } catch (error) {
            console.error('Error fetching user data:', error);
            setUser(null);
        }
    };
    useEffect(() => {
        getUser();
    }, []);
    return (
        <>
            <Navigation />

            <Routes>
                <Route
                    path="/"
                    element={
                        <PrivateRoute user={user}>
                            <TodoPage />
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
