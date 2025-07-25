import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = existingUsers.find((user) => user.email === email);

    if (userExists) {
      alert('User already exists. Please login.');
      navigate('/');
      return;
    }

    existingUsers.push({ email, password });
    localStorage.setItem('users', JSON.stringify(existingUsers));

    alert('Signup successful! You can now login.');
    navigate('/');
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button onClick={handleSignup}>Signup</button>
      <p>
        Already have an account? <a href="/">Login</a>
      </p>
    </div>
  );
}

export default Signup;
