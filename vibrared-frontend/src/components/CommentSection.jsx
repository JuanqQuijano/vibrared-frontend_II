// src/components/CommentSection.jsx
import React, { useState, useEffect } from 'react';
import apiClient from '../api/axiosConfig';

const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    useEffect(() => {
        apiClient.get(`/comments/post/${postId}`).then(res => setComments(res.data));
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        const { data } = await apiClient.post('/comments', { post_id: postId, text: newComment });
        setComments([...comments, data]);
        setNewComment('');
    };

    return (
        <div className="comment-section">
            {comments.map(comment => (
                <div key={comment._id} className="comment">
                    <img src={comment.user_id.profile_picture_url || 'https://via.placeholder.com/30'} alt="avatar"/>
                    <strong>{comment.user_id.username}</strong>: {comment.text}
                </div>
            ))}
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Comentar</button>
            </form>
        </div>
    );
};

export default CommentSection;
