// src/pages/UsersPage.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient.get('/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h1>Usuarios de VibraRed</h1>
      {users.map(user => (
        <div key={user._id} className="card">
          <h4>{user.username}</h4>
          <p>{user.email}</p>
          <p><i>{user.bio}</i></p>
        </div>
      ))}
    </div>
  );
};

export default UsersPage;