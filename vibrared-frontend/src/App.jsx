// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import PostsPage from './pages/PostsPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {user && <Navbar />} {/* Mostrar Navbar solo si hay usuario */}
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/users" element={<UsersPage />} />
          </Route>
          <Route path="*" element={<Navigate to={user ? "/posts" : "/login"} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
