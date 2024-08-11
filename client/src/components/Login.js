import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { loginUser } from '../services/api'; // Adjust the import path as needed
import '../css/Login.css'; // Import custom CSS file

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });
      const token = data.token;
      localStorage.setItem('token', token); // Store token in local storage
      setIsAuthenticated(true);
      navigate('/');
      window.location.reload();
    } catch (error) {
      setError('Error logging in. Please check your credentials and try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <Container className="login-container">
      <h2 className="text-center mb-4">Log In</h2>
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group controlId="formUsername">
          <Form.Label className="form-label">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mt-3">
          Log In
        </Button>
        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      </Form>
    </Container>
  );
};

export default Login;
