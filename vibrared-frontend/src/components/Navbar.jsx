// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  return (
    <nav className="navbar">
      <Link to="/posts" className="navbar-brand">VibraRed</Link>
      <div>
        <Link to="/posts">Publicaciones</Link>
        <Link to="/users">Usuarios</Link>
        <button onClick={handleLogout} style={{ marginLeft: '1rem' }}>Salir</button>
      </div>
    </nav>
  );
};

export default Navbar;
