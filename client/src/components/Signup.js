import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupUser } from '../services/api'; // Adjust the import path as needed
import '../css/Signup.css'; // Import the CSS file

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser({ username, password, phone });
      setSuccess('Sign up successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000); // Redirect after a short delay
    } catch (error) {
      setError('Error signing up. Please try again.');
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
    </div>
  );
};

export default Signup;
