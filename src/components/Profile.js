import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import logout from '../hooks/logout'; // Adjust the import path as needed
import API_BASE_URL from '../config/apiConfig'; // Adjust the path as necessary
import List from '../components/List';
const Profile = () => {
    const [username, setUsername] = useState('');
    const [title, setTitle] = useState('');
    const [des, setDes] = useState('');
    const [cat, setCat] = useState('');
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
                    //return <Navigate to="/login" />;
                    localStorage.removeItem('token');
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
            const response = await axios.post(`${API_BASE_URL}/addpost`, { title, des, cat }, {
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
                {/* <Form.Group controlId="formPhone">
                    <Form.Label>post</Form.Label>
                    <Form.Control
                        type="phone"
                        placeholder="Enter des"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </Form.Group> */}
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter description"
                        value={des}
                        onChange={(e) => setDes(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        as="select"
                        value={cat}
                        onChange={(e) => setCat(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <option value="php">php</option>
                        <option value="laravel">laravel</option>
                        <option value="mysql">mysql</option>
                        <option value="nodejs">nodejs</option>
                        <option value="reactjs">reactjs</option>
                    </Form.Control>
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}

                <Button variant="primary" type="submit">
                    post
                </Button>
            </Form>
            <List />
        </Container >
    );
};

export default Profile;
