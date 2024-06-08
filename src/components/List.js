import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner } from 'react-bootstrap';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'; // Import heart icons
import API_BASE_URL from '../config/apiConfig'; // Adjust the path as necessary

const List = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token'); // Replace with your actual token

    useEffect(() => {
        // const token = localStorage.getItem('token');
        const fetchPosts = async () => {
            try {
                const response = await axios.get(
                    `${API_BASE_URL}/getposts`,

                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
                if (response.data && Array.isArray(response.data.postlist)) {
                    setPosts(response.data.postlist);
                } else {
                    throw new Error('Data is not an array');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [token]);
    const toggleLike = async (post) => {
        try {
            const newStatus = post.like_status === 1 ? 0 : 1;
            const post_id = post.post_id;
            // console.log(post);
            const response = await axios.post(
                `${API_BASE_URL}/likes`,
                { post_id: post_id, status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.status === 201 || response.status === 200) {
                setPosts((prevPosts) =>
                    prevPosts.map((p) =>
                        p.post_id === post_id
                            ? { ...p, like_status: newStatus, total_likes: p.total_likes + (newStatus === 1 ? 1 : -1) }
                            : p
                    )
                );
            }
        } catch (error) {
            console.error('Error updating like status:', error);
        }
    };
    if (loading) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1 className="mb-4">Post List</h1>
            <div className="row">
                <div className="col-md-2">
                </div>
                {posts.map(post => (

                    <div key={post.post_id} className="col-md-12 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.description}</p>

                                <small className="card-text">{post.created_by}</small>|
                                <small className="card-text">{post.category}</small>
                                <div className="mt-2" onClick={() => toggleLike(post)}>
                                    {post.like_status === 1 ? (
                                        <AiFillHeart style={{ color: 'red', cursor: 'pointer' }} />
                                    ) : (
                                        <AiOutlineHeart style={{ color: 'grey', cursor: 'pointer' }} />
                                    )}
                                    <span className="ms-2">{post.total_likes} likes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}

            </div>
        </Container>
    );
};

export default List;
