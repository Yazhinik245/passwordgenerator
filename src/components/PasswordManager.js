import React, { useState, useEffect } from 'react';
import './PasswordManager.css';

function PasswordManager() {
  const [email, setEmail] = useState('');
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [savedPasswords, setSavedPasswords] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('passwords')) || [];
    setSavedPasswords(stored);
  }, []);

  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    setGeneratedPassword(password);
  };

  const savePassword = () => {
    if (!email || !generatedPassword) {
      alert('Please fill in the email and generate a password first.');
      return;
    }
    const newEntry = { email, password: generatedPassword };
    const updated = [...savedPasswords, newEntry];
    setSavedPasswords(updated);
    localStorage.setItem('passwords', JSON.stringify(updated));
    setEmail('');
    setGeneratedPassword('');
  };

  return (
    <div className="manager-container">
      <h2>Password Generator</h2>
      <input
        type="email"
        placeholder="Enter email or website"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Generated Password"
        value={generatedPassword}
        readOnly
      />
      <button onClick={generatePassword}>Generate Password</button>
      <button onClick={savePassword}>Save Password</button>

      <h3>Saved Passwords</h3>
      <ul>
        {savedPasswords.map((entry, index) => (
          <li key={index}>
            <strong>{entry.email}:</strong> {entry.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordManager;
