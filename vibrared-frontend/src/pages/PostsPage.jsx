// src/pages/PostsPage.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';
import CommentSection from '../components/CommentSection';

const PostsPage = () => {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    apiClient.get('/posts').then(res => setPosts(res.data));
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    const { data } = await apiClient.post('/posts', { text_content: newPostContent });
    setPosts([data, ...posts]);
    setNewPostContent('');
  };
  
  const handleLike = async (postId) => {
      // Simulación de like/unlike en el frontend
      setPosts(posts.map(post => {
          if (post._id === postId) {
              // Aquí podrías guardar el estado de "liked" por post
              // para un toggle real. Por ahora, solo incrementamos.
              return { ...post, likes_count: post.likes_count + 1 };
          }
          return post;
      }));
      // Llamada al backend para persistir el like
      await apiClient.put(`/posts/${postId}/like`);
  };

  const toggleComments = (postId) => {
    setVisibleComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="container">
      {/* Formulario para crear post */}
      <div className="card">
        <form onSubmit={handleCreatePost}>
          <textarea
            placeholder="¿Qué estás pensando?"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Publicar</button>
        </form>
      </div>

      {/* Lista de posts */}
      {posts.map(post => (
        <div key={post._id} className="card">
          <div className="post-header">
              <img src={post.user_id?.profile_picture_url || 'https://via.placeholder.com/40'} alt="avatar"/>
              <h4>{post.user_id?.username || 'Usuario'}</h4>
          </div>
          <p>{post.text_content}</p>
          <div className="card-footer">
            <button onClick={() => handleLike(post._id)}>
              👍 Likes: {post.likes_count}
            </button>
            <button onClick={() => toggleComments(post._id)}>
              💬 Comentarios: {post.comments_count}
            </button>
          </div>
          {visibleComments[post._id] && <CommentSection postId={post._id} />}
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
