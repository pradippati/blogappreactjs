import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import logout from '../hooks/logout'; // Adjust the import path as needed

const Profile = () => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(true);
    const token = localStorage.getItem('token');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    console.log("Token retrieved from localStorage:", token);
    useEffect(() => {


        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await axios.get('http://localhost:4000/auth/user', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setUsername(response.data.user.name);
                    setAuthenticated(true);
                } catch (err) {
                    console.error('Error fetching user data', err);
                    setAuthenticated(false);
                } finally {
                    setLoading(false);
                }
            };
            fetchUserData();
        } else {
            setLoading(false);
            setAuthenticated(false);
        }
    }, []);
    const postSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:4000/auth/addpost', { title, des }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('post successful:', response.data);
            setSuccess('post created successfully.');
            setError('');
        } catch (err) {
            setError(' failed');
        }
    };
    if (loading) {
        return (
            <Container>
                <Spinner animation="border" />
                <p>Loading...</p>
            </Container>
        );
    }

    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return (
        <Container>
            <h2>Profile</h2>
            <p>Welcome, {username}</p>
            <Button onClick={logout}>Logout</Button>
            <h2>Register</h2>
            <Form onSubmit={postSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPhone">
                    <Form.Label>post</Form.Label>
                    <Form.Control
                        type="phone"
                        placeholder="Enter des"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </Form.Group>


                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <Button variant="primary" type="submit">
                    post
                </Button>
            </Form>
        </Container>
    );
};

export default Profile;