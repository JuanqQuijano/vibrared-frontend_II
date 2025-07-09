// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">VibraRed</Link>
      <div>
        <Link to="/posts">Publicaciones</Link>
        <Link to="/users">Usuarios</Link>
      </div>
    </nav>
  );
};

export default Navbar;