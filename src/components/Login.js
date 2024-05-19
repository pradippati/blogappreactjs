// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/auth/login', { username, password });
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            // const token = localStorage.getItem('token');
            // console.log(token);
            //localStorage.setItem('username', response.data.user.username);
            // navigate('/profile');
            window.location.href = '/profile';
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <Container>
            <nav>
                <ul>
                    {/* <li>
            <Link to="/login">Login</Link>
          </li> */}
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                </ul>
            </nav>
            <h2>Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {error && <p style={{ color: 'red' }}>{error}</p>}

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </Container>
    );
};

export default Login;
