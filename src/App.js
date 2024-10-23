import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoPage from './pages/TodoPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './routes/PrivateRoute';
import { useState, useEffect } from 'react';
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    // 토큰을 통해 유저정보를 가져온다
    try {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        const response = await api.get('/user/me');
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('token');
    delete api.defaults.headers['authorization'];
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage onLogout={handleLogout} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage setUser={setUser} user={user} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
