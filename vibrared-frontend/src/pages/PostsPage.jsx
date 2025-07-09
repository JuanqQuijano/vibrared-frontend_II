// src/pages/PostsPage.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiClient.get('/posts');
        setPosts(response.data);
      } catch (err) {
        setError('Error al cargar las publicaciones.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container">
      <h1>Publicaciones Recientes</h1>
      {posts.map(post => (
        <div key={post._id} className="card">
          {/* Tu backend popula user_id, por eso podemos acceder a .username */}
          <h4>Por: {post.user_id?.username || 'Usuario desconocido'}</h4>
          <p>{post.text_content}</p>
          <div className="card-footer">
            <span>Likes: {post.likes_count}</span>
            <span>Comentarios: {post.comments_count}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;